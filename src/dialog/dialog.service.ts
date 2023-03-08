import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IData, IUser } from 'src/interfaces';
import { Dialog, DialogDocument } from 'src/schemas/dialog.schema';

@Injectable()
export class DialogService {
  constructor(
    @InjectModel(Dialog.name) private dialogModel: Model<DialogDocument>,
  ) {}


  async createDialog(users:string[]) {
    const dialog = await this.dialogModel.find({$or : [{users:[users[0],users[1]]},{users:[users[1],users[0]]}]})
    
    if(dialog.length!==0){
      return dialog[0]._id.toString()
    } else {
      const id=Date.now()
      await this.dialogModel.create({
        _id:id,
        users:users
      })
      return id.toString()
    }
  }

  async pushMessage(data:number,message:IData) {
    await this.dialogModel.updateOne({_id:data},{$push:{messages:message}})
    
  }

  async getDialogs() {
    return await this.dialogModel.find().exec();
  }

  async getDialog(_id:number) {
    return await this.dialogModel.find({_id:_id}).exec()
  }

  async deleteDialogs() {
    await this.dialogModel.deleteMany({}).exec()
  }

  async findLastMessages(name:string) {
     return await this.dialogModel.aggregate([
      {
        $match: { users : { $in: [ name ] }}
      },
      { 
        $project:
          {
            _id: 1,
            users:2,
            message: { $arrayElemAt: [ "$messages", -1 ] }
          }
      },  
      {
        $match: { message : { $exists: true }}
      } 
    ]) 
  }
}