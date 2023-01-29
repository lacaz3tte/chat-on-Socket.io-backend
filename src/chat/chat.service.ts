import { Injectable } from '@nestjs/common';
import { IData } from 'src/interfaces';

@Injectable()
export class ChatService {
  //constructor(private usersService: UsersService) {}

  async getMessages(): Promise<any> {
    return messages;
  }

  async addMessage(data: IData) {
    messages.push(data);
    console.log(messages);
  }
}

const messages: IData[] = [];
