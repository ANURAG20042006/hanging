import { Controller, Get, Post, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(@CurrentUser('userId') userId: string) {
    return this.notificationsService.getNotifications(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.notificationsService.markAsRead(id, userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.notificationsService.deleteNotification(id, userId);
  }
}
