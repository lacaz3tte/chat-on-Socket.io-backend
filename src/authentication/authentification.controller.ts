import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { IUser } from 'src/interfaces';
import { AuthentificationService } from './authentification.service';

@Controller()
export class AuthentificationController {
  constructor(private readonly authService: AuthentificationService) {}

  @Post('/login')
  async authentificate(@Body() user: IUser) {
    return this.authService.validateUser(user);
  }

  @Put('/login')
  async create(@Body() user: IUser) {
    return this.authService.create(user);
  }

  @Delete('/login')
  async delete() {
    return this.authService.delete();
  }

  @Get('/login')
  async get() {
    return this.authService.getUsers();
  }

  @Post('/searchLogins')
  async searchLogins(@Body() str: any) {
    return this.authService.searchUsers(str);
  }
}
