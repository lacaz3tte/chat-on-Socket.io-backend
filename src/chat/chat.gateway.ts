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
import { IAccounts, IData, IMessageToServer } from 'src/interfaces';
import { ChatService } from './chat.service';
import { DialogService } from './../dialog/dialog.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService, private dialogService:DialogService) {}
  @WebSocketServer()
  server: Server;

  /* @SubscribeMessage("messageToServer")
  handle(socket: Socket, message: IMessageToServer): any {
    console.log(message);
    this.dialogService.createDialog(message.name)
      .then(data=>{
        socket.to(data).emit("messageToClient", {name:message.name[1],msg:message.msg,date:message.date});
        this.dialogService.pushMessage(Number(data),{name:message.name[1],msg:message.msg,date:message.date}).then(()=>{
          if(message.name.includes(this.accountName)){
            this.updateChats(socket, this.accountName)
          }
        })
      })
  } */

  /* accountName
  accountId */

  /* @SubscribeMessage("wgoAmI")
  whoAmI(socket: Socket, name: string): any {
    this.accountName = name
    this.accountId = socket.id
    console.log('accountName: ' + this.accountName);
  } */

  arr:IAccounts[] = []

  afterInit() {
    console.log('server is started on 3001');
  }

  handleDisconnect(client: Socket) {
    console.log('disconnected ' + client.id);
  }

  /* updateChats = (socket:Socket, accountName:string) => {
    this.dialogService.findLastMessages(accountName).then((res)=>{
      console.log(res)
      console.log(this.accountName);
      socket.to(this.accountId).emit('updateDialogs', res)
    })
    
  } */

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client id: ' + client.id);

    client.on('roomMembers',(members)=>{
      this.dialogService.createDialog(members)
      .then(data=>{
        client.join(data)
        this.dialogService.getDialog(Number(data)).then(mess=>{
          client.emit("getMessages",mess[0].messages);
        })
      })
    })

    client.on("messageToServer",(message: IMessageToServer)=>{
      this.dialogService.createDialog(message.name)
        .then(room=>{
          client.to(room).emit("messageToClient", {name:message.name[1],msg:message.msg,date:message.date});
          this.dialogService.pushMessage(Number(room),{name:message.name[1],msg:message.msg,date:message.date}).then(()=>{
            /* if(message.name.includes(message.name[1])){
              this.dialogService.findLastMessages(message.name[1]).then((res)=>{
                console.log(res);
                console.log(client.id);
                client.emit('updateDialogs', res)
              })
            } */
            this.arr.forEach((acc)=>{
              if(message.name.includes(acc.name)){
                //client.to(acc.id).emit('a','Hello!')
                this.dialogService.findLastMessages(acc.name).then((res)=>{
                  console.log(res);
                  client.to(acc.id).emit('a', res)
                })
              }
            })
          })
        })
    })

    client.on("arr",(msg:any)=> {
      this.arr = this.arr.filter(e=>e.name!==msg.chatName)
      this.arr.push({
        id:client.id,
        name:msg.chatName
      })
      console.log(this.arr);
      
    })

  }
}
