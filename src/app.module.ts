import { Module } from '@nestjs/common';
import { AuthentificationModule } from './authentication/authentification.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule, AuthentificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
