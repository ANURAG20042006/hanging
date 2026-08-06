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
  cors: { 
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true,
  },
  namespace: '/planning',
})
@UseGuards(WsJwtGuard)
export class PlanningGateway {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(PlanningGateway.name);

  @SubscribeMessage('join_planning_room')
  handleJoinRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.roomId);
    this.logger.log(`Client ${client.id} joined planning room ${data.roomId}`);
    return { status: 'joined', roomId: data.roomId };
  }

  @SubscribeMessage('vote_poll')
  handleVotePoll(@MessageBody() data: { pollId: string; optionId: string; userId: string }) {
    this.logger.log(`User ${data.userId} voted for option ${data.optionId} in poll ${data.pollId}`);
    this.server.emit('poll_updated', data);
    return { status: 'success' };
  }

  @SubscribeMessage('settle_expense')
  handleSettleExpense(@MessageBody() data: { expenseId: string; settledBy: string }) {
    this.logger.log(`Expense ${data.expenseId} settled by ${data.settledBy}`);
    this.server.emit('expense_settled', data);
    return { status: 'success' };
  }
}
