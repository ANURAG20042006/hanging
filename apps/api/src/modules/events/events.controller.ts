import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() dto: any, @CurrentUser('userId') userId: string) {
    return this.eventsService.createEvent(dto, userId);
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    return this.eventsService.getEvent(id);
  }

  @Post(':id/rsvp')
  async rsvp(@Param('id') id: string, @Body() body: { status: string }, @CurrentUser('userId') userId: string) {
    return this.eventsService.rsvp(id, userId, body.status);
  }
}
