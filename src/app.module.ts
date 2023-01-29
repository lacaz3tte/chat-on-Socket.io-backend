import { Module } from '@nestjs/common';
import { AuthentificationModule } from './authentication/authentification.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChatModule,
    AuthentificationModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/messagesdb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
