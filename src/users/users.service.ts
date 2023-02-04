import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { UserDocument, User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(login: string): Promise<any> {
    const searchedUser = await this.userModel.find({ login: login });
    return searchedUser;
  }

  async create(user: IUser) {
    const searchedUser = await this.userModel.find({ login: user.login });
    if (searchedUser[0] === undefined) {
      await this.userModel.create(user);
      //console.log(await this.userModel.find());
      return 'true';
    } else {
      //console.log(await this.userModel.find());
      return 'false';
    }
  }

  async deleteAccounts() {
    await this.userModel.deleteMany({}).exec();
  }

  async findUsers() {
    const users = await this.userModel.find({}).exec();
    return users;
  }
}
