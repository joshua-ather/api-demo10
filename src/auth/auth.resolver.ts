import { Resolver, Query, Context } from '@nestjs/graphql';
import { UserType } from './dto/user.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './graphql-auth.guard';
import { AuthService } from './auth.service';

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserType)
  async user(@Context() context) {
    return context.req.user;
  }
}

