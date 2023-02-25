import { Module } from '@nestjs/common';
import { AuthentificationModule } from './authentication/authentification.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DialogModule } from './dialog/dialog.module'

@Module({
  imports: [
    ChatModule,
    AuthentificationModule,
    DialogModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/messagesdb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
