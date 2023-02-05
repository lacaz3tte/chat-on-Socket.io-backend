import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { UserDocument, User } from 'src/schemas/user.schema';
//works only from require
const bcrypt = require('bcrypt')

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(login: string): Promise<any> {
    const searchedUser = await this.userModel.find({ login: login });
    return searchedUser;
  }

  async create(user: IUser) {
    const saltRounds = 10
    const searchedUser = await this.userModel.find({ login: user.login });
    if (searchedUser[0] === undefined) {
      const hash = bcrypt.hashSync(user.password, saltRounds);
      await this.userModel.create({login:user.login,password:hash});
      return 'true';
    } else {
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
