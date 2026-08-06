import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../../common/guards/ws-jwt.guard';

@WebSocketGateway({ 
  cors: { 
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
  }, 
  namespace: '/' 
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    // Handle auth extraction & presence
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('join_channel')
  async handleJoinChannel(@ConnectedSocket() client: Socket, @MessageBody() data: { channelId: string }) {
    client.join(`channel:${data.channelId}`);
    return { event: 'joined', channelId: data.channelId };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('send_message')
  async handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const message = await this.chatService.createMessage(data.channelId, client.data.user.userId, data.content);
    this.server.to(`channel:${data.channelId}`).emit('new_message', message);
    return message;
  }
}
