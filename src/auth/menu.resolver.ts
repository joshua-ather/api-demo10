import { Resolver, Query, Context } from '@nestjs/graphql';
import { MenuType } from './dto/menu.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from '../schemas/menu.schema';
import { Model } from 'mongoose';

@Resolver(() => MenuType)
export class MenuResolver {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [MenuType])
  async menus(@Context() context) {
    const user = context.req.user;
    return this.menuModel.find({ roles: user.role });
  }
}
