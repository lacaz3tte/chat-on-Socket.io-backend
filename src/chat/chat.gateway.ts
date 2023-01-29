import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { IData } from 'src/interfaces';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handle(socket: Socket, message: IData): void {
    socket.broadcast.emit('message', message);
    this.chatService.addMessage(message);
  }

  afterInit() {
    console.log('server is started on 3001');
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected ' + client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('connected ' + client.id);
  }
}
