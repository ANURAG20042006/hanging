import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DevicesService } from './devices.service';

@ApiTags('devices')
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('sessions')
  @ApiOperation({ summary: 'Get active device sessions (Web, Android, iOS, Desktop, PWA)' })
  async getSessions(@CurrentUser() user: any) {
    return this.devicesService.getActiveSessions(user?.userId || 'u1');
  }

  @Post('logout-remote')
  @ApiOperation({ summary: 'Remote logout specific device session' })
  async logoutRemote(@Body() body: { sessionId: string }) {
    return this.devicesService.logoutRemoteSession(body.sessionId);
  }

  @Post('biometrics')
  @ApiOperation({ summary: 'Toggle Face ID / Touch ID biometric authentication' })
  async toggleBiometrics(@Body() body: { enabled: boolean }) {
    return this.devicesService.toggleBiometrics(body.enabled);
  }
}
