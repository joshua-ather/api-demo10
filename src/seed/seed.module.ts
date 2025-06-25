import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { Menu, MenuSchema } from '../schemas/menu.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // jika kamu pakai .env
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/nest10'),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Menu.name, schema: MenuSchema },
    ]),
  ],
})
export class SeedModule {}
