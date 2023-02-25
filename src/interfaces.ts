export interface IData {
  name: string;
  msg: string;
  date: number;
}

export interface IUser {
  login: string;
  password: string;
}

export interface IMessageToServer {
  name: string[];
  msg: string;
  date: number;
}

