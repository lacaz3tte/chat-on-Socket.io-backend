import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  name: string;

  @Prop()
  msg: string;

  @Prop()
  date: number;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
