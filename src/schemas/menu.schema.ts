import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema({ timestamps: true })
export class Menu {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  path: string;

  @Prop()
  icon: string;

  @Prop({ type: [String] }) // misal: ['admin', 'user']
  roles: string[];

  @Prop({ type: Types.ObjectId, ref: 'Menu', default: null })
  parentId: Types.ObjectId;

  @Prop({ default: 0 })
  order: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
