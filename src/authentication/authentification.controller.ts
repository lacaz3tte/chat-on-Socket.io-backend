import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

@Controller()
export class AuthentificationController {
  constructor(private readonly authService: AuthentificationService) {}

  @Post('/auth')
  async authentificate(@Body() body) {
    return this.authService.validateUser(body.name, body.pass);
  }

  @Post('/create')
  async create(@Body() body) {
    return this.authService.create(body.name, body.pass);
  }
}
