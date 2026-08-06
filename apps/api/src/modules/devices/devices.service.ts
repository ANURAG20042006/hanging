import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class DevicesService {
  private readonly logger = new Logger(DevicesService.name);

  constructor(private readonly prisma: PrismaService) {}

  // 1. Get Active Sessions
  async getActiveSessions(userId: string = 'u1') {
    return [
      { id: "s1", deviceName: "Chrome Web App (Current)", platform: "Web / Windows", ip: "192.168.1.42", location: "Goa, India 🇮🇳", lastActive: "Active Now", isCurrent: true },
      { id: "s2", deviceName: "iPhone 15 Pro (Face ID)", platform: "iOS App / PWA", ip: "10.0.0.12", location: "Goa, India 🇮🇳", lastActive: "10 mins ago", isCurrent: false },
      { id: "s3", deviceName: "MacBook Pro Electron", platform: "Desktop App", ip: "192.168.1.18", location: "Goa, India 🇮🇳", lastActive: "2 hours ago", isCurrent: false },
    ];
  }

  // 2. Remote Logout Session
  async logoutRemoteSession(sessionId: string) {
    this.logger.log(`Remote logging out device session: ${sessionId}`);
    return { status: "logged_out", sessionId };
  }

  // 3. Biometrics Security Settings
  async toggleBiometrics(enabled: boolean) {
    this.logger.log(`Biometrics authentication toggled: ${enabled}`);
    return { biometricsEnabled: enabled };
  }
}
