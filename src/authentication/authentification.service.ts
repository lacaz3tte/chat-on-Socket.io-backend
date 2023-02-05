import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/interfaces';
//works only from require
const bcrypt = require('bcrypt')

@Injectable()
export class AuthentificationService {
  constructor(private usersService: UsersService) {}

  async validateUser(user: IUser): Promise<any> {
    const searchedUser = await this.usersService.findOne(user.login);
    if (
      searchedUser[0] !== undefined 
    ) {
      const match = await bcrypt.compare(user.password, searchedUser[0].password)
      if(match){
        const { password, ...result } = user;
        return result;
      }
    }
    return { login: null };
  }

  async create(user: IUser) {
    return await this.usersService.create(user);
  }

  async delete() {
    return await this.usersService.deleteAccounts();
  }

  async getUsers() {
    return await this.usersService.findUsers();
  }
}
