import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Games & Arcade')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new multiplayer game match room' })
  createGame(
    @CurrentUser('id') userId: string,
    @Body() data: any,
  ) {
    return this.gamesService.createGame(data, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get game state and active players' })
  getGame(@Param('id') id: string) {
    return this.gamesService.getGame(id);
  }

  @Patch(':id/state')
  @ApiOperation({ summary: 'Update game state or player move' })
  updateState(
    @Param('id') id: string,
    @Body() newState: any,
  ) {
    return this.gamesService.updateState(id, newState);
  }

  @Get('leaderboards/rankings')
  @ApiOperation({ summary: 'Get Arcade & Squad leaderboards' })
  getLeaderboards(@Query('type') type: 'games' | 'quiz' | 'movies' | 'memories') {
    return this.gamesService.getLeaderboards(type || 'games');
  }

  @Get('achievements/me')
  @ApiOperation({ summary: 'Get current user unlocked achievements' })
  getAchievements(@CurrentUser('id') userId: string) {
    return this.gamesService.getAchievements(userId);
  }

  @Get('feed/timeline')
  @ApiOperation({ summary: 'Get real-time squad activity feed' })
  getActivityFeed() {
    return this.gamesService.getActivityFeed();
  }

  @Get('progress/me')
  @ApiOperation({ summary: 'Get current user level, XP progress, and streaks' })
  getUserProgress(@CurrentUser('id') userId: string) {
    return this.gamesService.getUserProgress(userId);
  }
}
