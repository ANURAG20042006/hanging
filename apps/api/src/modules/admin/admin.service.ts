import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

export interface CrashReport {
  id: string;
  error: string;
  stack?: string;
  appVersion: string;
  platform: string;
  userAgent?: string;
  timestamp: string;
  occurrences: number;
  status: 'open' | 'investigating' | 'resolved';
}

export interface ModerationReport {
  id: string;
  reportedUser: string;
  reporterUser: string;
  reason: string;
  contentType: 'chat' | 'photo' | 'profile' | 'voice';
  contentSnippet: string;
  status: 'pending' | 'actioned' | 'dismissed';
  createdAt: string;
}

@Injectable()
export class AdminService {
  private crashReports: CrashReport[] = [
    {
      id: 'crash-101',
      error: 'TypeError: Cannot read properties of undefined (reading `webSocket`)',
      stack: 'Error at SocketService.connect (socket.ts:42:15)\n  at ClubhouseRoom.tsx:118:2',
      appVersion: 'v1.4.2',
      platform: 'Web (Chrome 124)',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      occurrences: 14,
      status: 'open',
    },
    {
      id: 'crash-102',
      error: 'RenderError: WebGL context lost during spatial audio graph build',
      stack: 'WebGLContextLost at Canvas.tsx:89:10\n  at ThreeCanvas.tsx:44',
      appVersion: 'v1.4.1',
      platform: 'Windows Desktop (Electron)',
      timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      occurrences: 3,
      status: 'investigating',
    },
  ];

  private moderationReports: ModerationReport[] = [
    {
      id: 'mod-201',
      reportedUser: 'Alex Vance (@alex_v)',
      reporterUser: 'Sarah Connor (@sarah_c)',
      reason: 'Inappropriate language in public game lobby',
      contentType: 'chat',
      contentSnippet: 'Hey everyone stop ruining the game state...',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'mod-202',
      reportedUser: 'Dave Miller (@dave_m)',
      reporterUser: 'Elena Rostova (@elena_r)',
      reason: 'Spam invite code links',
      contentType: 'chat',
      contentSnippet: 'Join my channel fast: https://hangout.app/invite/spamm123',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    return {
      activeUsersNow: 412,
      totalUsers: 14280,
      activeVoiceRooms: 18,
      dailyMessagesSent: 68420,
      monthlyActiveUsers: 11450,
      systemHealth: {
        apiStatus: 'healthy',
        databaseConnections: 24,
        redisMemoryUsedMb: 128,
        uptimePercentage: 99.98,
      },
    };
  }

  async getAnalytics(range: string) {
    return {
      range,
      userGrowth: [
        { date: 'Mon', dau: 3400, mau: 10200, newSignups: 240 },
        { date: 'Tue', dau: 3620, mau: 10450, newSignups: 280 },
        { date: 'Wed', dau: 3890, mau: 10700, newSignups: 310 },
        { date: 'Thu', dau: 4100, mau: 10950, newSignups: 340 },
        { date: 'Fri', dau: 4450, mau: 11200, newSignups: 420 },
        { date: 'Sat', dau: 4890, mau: 11350, newSignups: 510 },
        { date: 'Sun', dau: 5120, mau: 11450, newSignups: 490 },
      ],
      retentionRates: {
        day1: '78%',
        day7: '64%',
        day30: '49%',
      },
      topGroupActivities: [
        { group: 'College Alumni 2024', members: 42, activeHoursThisWeek: 86 },
        { group: 'Goa Summer Reunion', members: 18, activeHoursThisWeek: 64 },
        { group: 'Late Night Gamers', members: 29, activeHoursThisWeek: 112 },
      ],
    };
  }

  async getModerationReports() {
    return this.moderationReports;
  }

  async handleModerationAction(body: { reportId: string; action: 'warn' | 'suspend' | 'ban' | 'dismiss'; reason: string }) {
    const report = this.moderationReports.find((r) => r.id === body.reportId);
    if (report) {
      report.status = body.action === 'dismiss' ? 'dismissed' : 'actioned';
    }
    return {
      success: true,
      reportId: body.reportId,
      appliedAction: body.action,
      reason: body.reason,
      timestamp: new Date().toISOString(),
    };
  }

  async getCrashReports() {
    return this.crashReports;
  }

  async submitCrashReport(body: { error: string; stack?: string; appVersion: string; platform: string; userAgent?: string }) {
    const newReport: CrashReport = {
      id: `crash-${Date.now()}`,
      error: body.error,
      stack: body.stack,
      appVersion: body.appVersion || 'v1.0.0',
      platform: body.platform || 'Unknown',
      userAgent: body.userAgent,
      timestamp: new Date().toISOString(),
      occurrences: 1,
      status: 'open',
    };
    this.crashReports.unshift(newReport);
    return { success: true, reportId: newReport.id };
  }
}
