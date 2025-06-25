import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Menu, MenuDocument } from '../schemas/menu.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    const { accessToken, refreshToken } = await this.generateTokens(user);

    await this.userModel.findByIdAndUpdate(user._id, { refreshToken });

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userModel.findById(payload.sfid);
    if (!user || user.refreshToken !== token) {
      throw new UnauthorizedException('Invalid token');
    }

    const tokens = await this.generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    return tokens;
  }

  async register(username: string, password: string, role: string) {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashed, role });
    return newUser.save();
  }

  async getMenusByRole(role: string): Promise<Menu[]> {
    const menus = await this.menuModel.find({ roles: role }).sort({ order: 1 });
    return menus;
  }

  async generateTokens(
    user: UserDocument,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sfid: (user._id as any).toString(), role: user.role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userModel.findById(payload.sfid);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token or user');
    }

    user.refreshToken = '';
    await user.save();
  }
}
