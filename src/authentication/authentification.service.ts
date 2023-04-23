import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/interfaces';
import { JwtService } from '@nestjs/jwt';
//works only from require
const bcrypt = require('bcrypt')

@Injectable()
export class AuthentificationService {
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService
  ) {}

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

  async login(user: IUser) {
    const searchedUser = await this.validateUser(user)
      if(searchedUser.login===null){
        return null
      } else {
        console.log('+')
        const payload = { username: user.login}; //change username,userID
          return {
            access_token: this.jwtService.sign(payload),
          };
      }
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

  async searchUsers(str) {
    return await this.usersService.searchUsers(str);
  }
}
