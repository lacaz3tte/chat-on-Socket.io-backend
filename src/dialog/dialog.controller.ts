import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { IUser } from 'src/interfaces';
import { DialogService } from './dialog.service';

@Controller()
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  /* @Post('/login')
  async authentificate(@Body() user: IUser) {
    console.log(user);
    return this.authService.validateUser(user);
  } */

  @Put('/dialogs')
  async create(@Body() users:string[]) {
    console.log(users);
    return this.dialogService.createDialog(users);
  }

  /* @Delete('/login')
  async delete() {
    return this.authService.delete();
  } */

  @Get('/dialogs')
  async get() {
    return this.dialogService.getDialogs();
  }

  @Delete('/dialogs')
  async delete() {
    return this.dialogService.deleteDialogs();
  }

   @Post('/lastDialogs')
  async lastDialogs(@Body() acc:any) {
    console.log(acc.name);
    return this.dialogService.findLastDialogs(acc.name);
  } 
}
