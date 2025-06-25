import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MenuType {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field()
  path: string;

  @Field()
  icon: string;

  @Field(() => [String])
  roles: string[];
}
