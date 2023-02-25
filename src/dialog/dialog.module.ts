import { Module } from '@nestjs/common';
import { DialogController } from './dialog.controller';
import { DialogService } from './dialog.service';
import { Dialog, DialogSchema } from 'src/schemas/dialog.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dialog.name, schema: DialogSchema }]),
  ],
  controllers: [DialogController],
  providers: [DialogService],
  exports:[DialogService]
})
export class DialogModule {}
