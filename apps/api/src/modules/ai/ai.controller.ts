import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('ai')
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Conversational Gemini AI assistant with memory context' })
  async chat(@Body() body: { prompt: string }, @CurrentUser() user: any) {
    return this.aiService.processAssistantChat(body.prompt, user?.userId || 'u1');
  }

  @Post('search-memories')
  @ApiOperation({ summary: 'Multimodal AI memory search' })
  async searchMemories(@Body() body: { query: string; friend?: string; year?: number }) {
    return this.aiService.searchMemories(body.query, body);
  }

  @Post('analyze-photo')
  @ApiOperation({ summary: 'AI Photo auto-captioning, face & celebration detection' })
  async analyzePhoto(@Body() body: { imageUrl: string }) {
    return this.aiService.analyzePhoto(body.imageUrl);
  }

  @Post('restore-photo')
  @ApiOperation({ summary: 'AI Photo restoration & resolution upscaling' })
  async restorePhoto(@Body() body: { imageUrl: string }) {
    return this.aiService.restorePhoto(body.imageUrl);
  }

  @Post('generate-story')
  @ApiOperation({ summary: 'AI Squad Memory Story generator' })
  async generateStory(@Body() body: { storyType?: "funny" | "travel" | "emotional" | "short" }) {
    return this.aiService.generateMemoryStory(body.storyType || 'travel');
  }

  @Post('generate-reel')
  @ApiOperation({ summary: 'AI Memory Reel & Video Outline generator' })
  async generateReel(@Body() body: { theme?: string }) {
    return this.aiService.generateVideoReel(body.theme || 'Goa Reunion 2026');
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'AI Smart Recommendations for Movies, Games, Trips, Songs' })
  async getRecommendations() {
    return this.aiService.getRecommendations();
  }

  @Post('export-scrapbook')
  @ApiOperation({ summary: 'AI Digital Scrapbook Annual Report PDF Exporter' })
  async exportScrapbook(@Body() body: { year?: number }) {
    return this.aiService.generateDigitalScrapbook(body.year || 2026);
  }
}
