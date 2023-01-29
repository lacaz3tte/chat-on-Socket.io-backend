import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
