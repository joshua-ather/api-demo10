// src/seed/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { User, UserDocument } from '../schemas/user.schema';
import { Menu, MenuDocument } from '../schemas/menu.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
  const menuModel = app.get<Model<MenuDocument>>(getModelToken(Menu.name));

  const adminExists = await userModel.exists({ username: 'admin' });
  if (!adminExists) {
    const hashed = await bcrypt.hash('admin123', 10);
    await userModel.create({
      username: 'admin',
      password: hashed,
      role: 'admin',
      status: 'active',
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  const menuCount = await menuModel.estimatedDocumentCount();
  if (menuCount === 0) {
    await menuModel.insertMany([
      { title: 'Dashboard', path: '/dashboard', icon: 'dashboard', roles: ['admin'], order: 1 },
      { title: 'Storage', path: '/storage', icon: 'settings', roles: ['admin'], order: 2 },
    ]);
    console.log('✅ Default menus created');
  } else {
    console.log('ℹ️ Menu data already exists');
  }

  await app.close();
}
runSeed();
