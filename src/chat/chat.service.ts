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

  async getMessages(): Promise<any> {
    return this.messageModel.find().exec();
  }

  async addMessage(data: IData) {
    //messages.push(data);
    //console.log(messages);
    try {
      await this.messageModel.create(data);
    } catch (e) {
      console.log(e);
    }
  }
}

//const messages: IData[] = [];
