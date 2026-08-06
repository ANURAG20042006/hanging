import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PlanningService } from './planning.service';

@ApiTags('planning')
@Controller('planning')
@UseGuards(JwtAuthGuard)
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Get('reunions')
  @ApiOperation({ summary: 'Get all squad reunion plans' })
  async getReunions() {
    return this.planningService.getReunions();
  }

  @Get('trips')
  @ApiOperation({ summary: 'Get all squad trip plans' })
  async getTrips() {
    return this.planningService.getTrips();
  }

  @Get('calendar')
  @ApiOperation({ summary: 'Get group calendar events' })
  async getCalendarEvents() {
    return this.planningService.getCalendarEvents();
  }

  @Get('polls')
  @ApiOperation({ summary: 'Get all squad polls and live votes' })
  async getPolls() {
    return this.planningService.getPolls();
  }

  @Get('documents')
  @ApiOperation({ summary: 'Get shared squad documents' })
  async getDocuments() {
    return this.planningService.getDocuments();
  }

  @Get('expenses')
  @ApiOperation({ summary: 'Get expense splits & balances' })
  async getExpenseSplits() {
    return this.planningService.getExpenseSplits();
  }

  @Get('bucket-list')
  @ApiOperation({ summary: 'Get squad bucket list items' })
  async getBucketList() {
    return this.planningService.getBucketList();
  }

  @Get('memory-wall')
  @ApiOperation({ summary: 'Get squad memory wall posts' })
  async getMemoryWall() {
    return this.planningService.getMemoryWall();
  }

  @Get('yearbook')
  @ApiOperation({ summary: 'Get digital yearbook pages' })
  async getYearbookPages() {
    return this.planningService.getYearbookPages();
  }

  @Get('time-capsules')
  @ApiOperation({ summary: 'Get sealed time capsules' })
  async getTimeCapsules() {
    return this.planningService.getTimeCapsules();
  }

  @Post('ai/generate-itinerary')
  @ApiOperation({ summary: 'AI assisted trip itinerary generator' })
  async generateAiItinerary(@Body() body: { destination: string; days?: number; budget?: string }) {
    return this.planningService.generateAiItinerary(
      body.destination || 'Goa, India',
      body.days || 3,
      body.budget || '$500'
    );
  }
}
