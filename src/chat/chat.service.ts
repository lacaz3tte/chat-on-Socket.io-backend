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

  async deleteMessages() {
    await this.messageModel.deleteMany({}).exec();
  }
}

