import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CinemaService, CreateCinemaRoomDto, AddQueueItemDto } from './cinema.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Cinema')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post('room')
  @ApiOperation({ summary: 'Create a new synchronized Watch Party room' })
  createRoom(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateCinemaRoomDto,
  ) {
    return this.cinemaService.createRoom(userId, dto);
  }

  @Get('room/:id')
  @ApiOperation({ summary: 'Get watch party room status and queue' })
  getRoom(@Param('id') id: string) {
    return this.cinemaService.getRoom(id);
  }

  @Post('queue')
  @ApiOperation({ summary: 'Add a video to the shared movie queue' })
  addQueue(
    @CurrentUser('id') userId: string,
    @Body() dto: AddQueueItemDto,
  ) {
    return this.cinemaService.addQueueItem(userId, dto);
  }

  @Patch('room/:id/state')
  @ApiOperation({ summary: 'Update playback state (play/pause/seek)' })
  updateState(
    @Param('id') id: string,
    @Body() body: { currentTime?: number; isPlaying?: boolean; videoUrl?: string },
  ) {
    return this.cinemaService.updatePlaybackState(id, body);
  }

  @Post('history')
  @ApiOperation({ summary: 'Record watched video to user history' })
  recordHistory(
    @CurrentUser('id') userId: string,
    @Body('videoUrl') videoUrl: string,
    @Body('title') title: string,
  ) {
    return this.cinemaService.addWatchHistory(userId, videoUrl, title);
  }
}
