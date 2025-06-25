import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../schemas/user.schema';
import { Menu, MenuSchema } from '../schemas/menu.schema';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { MenuResolver } from './menu.resolver';
import { GqlAuthGuard } from './graphql-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthResolver, MenuResolver, GqlAuthGuard],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Menu.name, schema: MenuSchema }
    ]),
  ],
})
export class AuthModule {}
