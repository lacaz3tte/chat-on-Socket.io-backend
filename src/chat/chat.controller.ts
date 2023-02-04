import { Controller, Delete, Get } from '@nestjs/common';
import { IData } from 'src/interfaces';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/mess')
  async getMessages() {
    return this.chatService.getMessages();
  }

  @Delete('/mess')
  async deleteMessages() {
    this.chatService.deleteMessages();
  }

  /* @Post('/mess')
  async addMessage(@Body() body: IData) {
    this.chatService.addMessage(body);
  } */
}
