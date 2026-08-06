import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SupportService } from './support.service';

@ApiTags('support')
@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get('tickets')
  @ApiOperation({ summary: 'Get user support tickets' })
  getTickets() {
    return this.supportService.getTickets();
  }

  @Post('tickets')
  @ApiOperation({ summary: 'Create new support ticket' })
  createTicket(@Body() body: { subject: string; category: string; description: string; priority?: 'low' | 'medium' | 'high' }) {
    return this.supportService.createTicket(body);
  }

  @Get('feedback')
  @ApiOperation({ summary: 'Get public feedback items and feature requests' })
  getFeedback() {
    return this.supportService.getFeedback();
  }

  @Post('feedback')
  @ApiOperation({ summary: 'Submit feedback or feature request' })
  submitFeedback(@Body() body: { title: string; category: string; description: string }) {
    return this.supportService.submitFeedback(body);
  }

  @Post('feedback/:id/upvote')
  @ApiOperation({ summary: 'Upvote a feature request' })
  upvoteFeedback(@Param('id') id: string) {
    return this.supportService.upvoteFeedback(id);
  }
}
