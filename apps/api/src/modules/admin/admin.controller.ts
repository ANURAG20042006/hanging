import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard-stats')
  @ApiOperation({ summary: 'Get high-level admin metrics & system telemetry' })
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('analytics')
  @ApiOperation({ summary: 'Get user growth, retention, DAU/MAU analytics' })
  getAnalytics(@Query('range') range?: string) {
    return this.adminService.getAnalytics(range || '30d');
  }

  @Get('moderation/reports')
  @ApiOperation({ summary: 'List flagged content and user reports' })
  getModerationReports() {
    return this.adminService.getModerationReports();
  }

  @Post('moderation/action')
  @ApiOperation({ summary: 'Execute moderation action (warn, suspend, ban, resolve)' })
  handleModerationAction(@Body() body: { reportId: string; action: 'warn' | 'suspend' | 'ban' | 'dismiss'; reason: string }) {
    return this.adminService.handleModerationAction(body);
  }

  @Get('crash-reports')
  @ApiOperation({ summary: 'List client and server crash reports' })
  getCrashReports() {
    return this.adminService.getCrashReports();
  }

  @Post('crash-reports')
  @ApiOperation({ summary: 'Submit client error or crash stack trace' })
  submitCrashReport(@Body() body: { error: string; stack?: string; appVersion: string; platform: string; userAgent?: string }) {
    return this.adminService.submitCrashReport(body);
  }
}
