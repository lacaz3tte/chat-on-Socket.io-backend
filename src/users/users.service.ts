import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(username: string, password: string) {
    const user = await this.users.find((user) => user.username === username);
    console.log(user);
    if (user === undefined) {
      this.users.push({
        userId: Date.now(),
        username: username,
        password: password,
      });
      return 'true';
    } else {
      return 'false';
    }
  }
}
