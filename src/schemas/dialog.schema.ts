import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IData } from 'src/interfaces';

export type DialogDocument = HydratedDocument<Dialog>;

@Schema()
export class Dialog {
  @Prop()
  _id: number;  

  @Prop()
  users: string[];

  @Prop()
  messages: IData[];
}

export const DialogSchema = SchemaFactory.createForClass(Dialog);
