import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { IUser } from 'src/interfaces';
import { DialogService } from './dialog.service';

@Controller()
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}


  @Put('/dialogs')
  async create(@Body() users:string[]) {
    return this.dialogService.createDialog(users);
  }

  @Get('/dialogs')
  async get() {
    return this.dialogService.getDialogs();
  }

  @Delete('/dialogs')
  async delete() {
    return this.dialogService.deleteDialogs();
  }

  @Post('/lastMessages')
  async lastDialogs(@Body() acc:any) {
    return this.dialogService.findLastMessages(acc.name);
  } 
}
