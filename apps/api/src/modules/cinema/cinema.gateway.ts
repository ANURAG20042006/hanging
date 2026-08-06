import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CinemaService } from './cinema.service';

@WebSocketGateway({
  cors: { 
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
  },
  namespace: '/cinema',
})
export class CinemaGateway {
  @WebSocketServer()
  server: Server;

  constructor(private cinemaService: CinemaService) {}

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; userId: string },
  ) {
    client.join(`cinema_${data.roomId}`);
    client.to(`cinema_${data.roomId}`).emit('user_joined', { userId: data.userId });
  }

  @SubscribeMessage('sync_play')
  handleSyncPlay(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; currentTime: number },
  ) {
    this.cinemaService.updatePlaybackState(data.roomId, {
      currentTime: data.currentTime,
      isPlaying: true,
    });
    client.to(`cinema_${data.roomId}`).emit('on_play', { currentTime: data.currentTime });
  }

  @SubscribeMessage('sync_pause')
  handleSyncPause(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; currentTime: number },
  ) {
    this.cinemaService.updatePlaybackState(data.roomId, {
      currentTime: data.currentTime,
      isPlaying: false,
    });
    client.to(`cinema_${data.roomId}`).emit('on_pause', { currentTime: data.currentTime });
  }

  @SubscribeMessage('sync_seek')
  handleSyncSeek(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; currentTime: number },
  ) {
    this.cinemaService.updatePlaybackState(data.roomId, { currentTime: data.currentTime });
    client.to(`cinema_${data.roomId}`).emit('on_seek', { currentTime: data.currentTime });
  }

  @SubscribeMessage('send_reaction')
  handleEmojiReaction(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; emoji: string; userId: string },
  ) {
    this.server.to(`cinema_${data.roomId}`).emit('on_reaction', {
      emoji: data.emoji,
      userId: data.userId,
      timestamp: Date.now(),
    });
  }
}
