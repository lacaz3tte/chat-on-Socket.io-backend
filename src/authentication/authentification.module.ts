import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService,LocalStrategy],
})
export class AuthentificationModule {}
