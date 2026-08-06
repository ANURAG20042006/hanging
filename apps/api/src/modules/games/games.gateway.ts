import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GamesService } from './games.service';

@WebSocketGateway({
  cors: { 
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
  },
  namespace: '/arcade',
})
export class GamesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private gamesService: GamesService) {}

  @SubscribeMessage('join_game')
  handleJoinGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; userId: string; username: string },
  ) {
    client.join(`arcade_${data.gameId}`);
    this.server.to(`arcade_${data.gameId}`).emit('player_joined', {
      userId: data.userId,
      username: data.username,
      timestamp: Date.now(),
    });
  }

  @SubscribeMessage('make_move')
  handleMakeMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; move: any; nextTurnUserId: string },
  ) {
    client.to(`arcade_${data.gameId}`).emit('on_move', {
      move: data.move,
      nextTurnUserId: data.nextTurnUserId,
    });
  }

  @SubscribeMessage('draw_canvas')
  handlePictionaryDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string; lineData: any },
  ) {
    client.to(`arcade_${data.gameId}`).emit('on_draw', data.lineData);
  }

  @SubscribeMessage('submit_answer')
  handleSubmitAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { quizId: string; userId: string; answerIndex: number; score: number },
  ) {
    this.server.to(`arcade_${data.quizId}`).emit('on_answer_submitted', {
      userId: data.userId,
      score: data.score,
    });
  }
}
