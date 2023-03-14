import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { IUser } from 'src/interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthentificationService) {
    super();
  }

  async validate(user: IUser): Promise<any> {
    console.log(user);
    const account = await this.authService.validateUser(user);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}