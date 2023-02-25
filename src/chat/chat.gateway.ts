import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { IData, IMessageToServer } from 'src/interfaces';
import { ChatService } from './chat.service';
import { DialogService } from './../dialog/dialog.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService, private dialogService:DialogService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("messageToServer")
  handle(socket: Socket, message: IMessageToServer): any {
    console.log(message);
    this.dialogService.createDialog(message.name)
      .then(data=>{
        console.log('DataMessage: ' + data.toString());
        socket.to(data).emit("messageToClient", {name:message.name[1],msg:message.msg,date:message.date});
        this.dialogService.pushMessage(Number(data),{name:message.name[1],msg:message.msg,date:message.date})
      })
  }


  afterInit() {
    console.log('server is started on 3001');
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected ' + client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.on('roomMembers',(members)=>{
      console.log('Members:' + members);
      this.dialogService.createDialog(members)
      .then(data=>{
        client.join(data)
        console.log('Data: ' + data.toString());
        this.dialogService.getDialog(Number(data)).then(mess=>{
          console.log(mess[0].messages);
          client.emit("getMessages",mess[0].messages);
        })
      })
    })
  }
}
