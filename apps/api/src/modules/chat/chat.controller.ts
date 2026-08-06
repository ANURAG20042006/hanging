import { Controller, Post, Get, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('channels')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':id/messages')
  async sendMessage(
    @Param('id') channelId: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.chatService.createMessage(channelId, userId, dto.content);
  }

  @Get(':id/messages')
  async getMessages(
    @Param('id') channelId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 50,
  ) {
    return this.chatService.getMessages(channelId, cursor, Number(limit));
  }
}
