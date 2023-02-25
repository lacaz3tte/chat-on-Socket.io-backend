import { Injectable } from '@nestjs/common';
import { IData } from 'src/interfaces';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  /* async getMessages(): Promise<IData[]> {
    return await this.messageModel.find().exec();
  } */

  /* async addMessage(data: IData) {
    //messages.push(data);
    //console.log(messages);
    try {
      await this.messageModel.create(data);
    } catch (e) {
      console.log(e);
    }
  } */

  async deleteMessages() {
    await this.messageModel.deleteMany({}).exec();
  }
}

//const messages: IData[] = [];
