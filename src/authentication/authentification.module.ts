import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
})
export class AuthentificationModule {}
