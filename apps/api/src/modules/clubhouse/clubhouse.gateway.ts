import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards, Logger } from '@nestjs/common';
import { WsJwtGuard } from '../../common/guards/ws-jwt.guard';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/clubhouse',
})
@UseGuards(WsJwtGuard)
export class ClubhouseGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ClubhouseGateway.name);

  @SubscribeMessage('move_avatar')
  handleMoveAvatar(
    @MessageBody() data: { userId: string; x: number; y: number; z: number; animation: string; room: string },
    @ConnectedSocket() client: Socket
  ) {
    client.broadcast.to(data.room).emit('avatar_moved', data);
    return { status: 'ok' };
  }

  @SubscribeMessage('trigger_emote')
  handleTriggerEmote(
    @MessageBody() data: { userId: string; emote: string; room: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log(`User ${data.userId} triggered emote ${data.emote} in room ${data.room}`);
    this.server.to(data.room).emit('emote_triggered', data);
    return { status: 'ok' };
  }

  @SubscribeMessage('join_3d_room')
  handleJoin3dRoom(@MessageBody() data: { room: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.room);
    this.logger.log(`User ${data.userId} joined 3D Clubhouse Room: ${data.room}`);
    this.server.to(data.room).emit('player_joined_room', { userId: data.userId, room: data.room });
    return { status: 'joined', room: data.room };
  }
}
