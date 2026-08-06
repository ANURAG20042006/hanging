import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('voice')
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post('token')
  async generateToken(@Body() body: { roomName: string }, @CurrentUser() user: any) {
    return this.voiceService.generateToken(body.roomName, user.userId, user.email);
  }
}
