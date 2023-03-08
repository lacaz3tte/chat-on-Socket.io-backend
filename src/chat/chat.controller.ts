import { Controller, Delete, Get } from '@nestjs/common';
import { IData } from 'src/interfaces';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  //for Postman
  @Delete('/mess')
  async deleteMessages() {
    this.chatService.deleteMessages();
  }

}
