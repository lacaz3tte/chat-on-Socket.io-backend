import { Body, Controller, Get, Post } from '@nestjs/common';
import { IData } from 'src/interfaces';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/mess')
  async getMessages() {
    return this.chatService.getMessages();
  }

  /* @Post('/mess')
  async addMessage(@Body() body: IData) {
    this.chatService.addMessage(body);
  } */
}
