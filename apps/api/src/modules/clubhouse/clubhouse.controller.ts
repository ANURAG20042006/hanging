import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ClubhouseService } from './clubhouse.service';

@ApiTags('clubhouse')
@UseGuards(JwtAuthGuard)
@Controller('clubhouse')
export class ClubhouseController {
  constructor(private readonly clubhouseService: ClubhouseService) {}

  @Get('rooms')
  @ApiOperation({ summary: 'Get all 16 interactive 3D clubhouse rooms and active player states' })
  async getRooms() {
    return this.clubhouseService.getClubhouseRooms();
  }
}
