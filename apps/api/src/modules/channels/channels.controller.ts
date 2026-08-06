import { Controller, Post, Get, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller()
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post('groups/:groupId/channels')
  async createChannel(
    @Param('groupId') groupId: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateChannelDto,
  ) {
    return this.channelsService.createChannel(groupId, userId, dto);
  }

  @Get('groups/:groupId/channels')
  async getChannels(@Param('groupId') groupId: string) {
    return this.channelsService.getChannels(groupId);
  }

  @Patch('channels/:id')
  async updateChannel(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
    @Body() dto: Partial<CreateChannelDto>,
  ) {
    return this.channelsService.updateChannel(id, userId, dto);
  }

  @Delete('channels/:id')
  async deleteChannel(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.channelsService.deleteChannel(id, userId);
  }
}
