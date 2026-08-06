import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: PrismaService,
          useValue: {
            user: { count: jest.fn().mockResolvedValue(14280) },
          },
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return high-level telemetry stats', async () => {
    const stats = await service.getDashboardStats();
    expect(stats).toHaveProperty('activeUsersNow');
    expect(stats.systemHealth.uptimePercentage).toBeGreaterThanOrEqual(99.9);
  });

  it('should list crash reports', async () => {
    const reports = await service.getCrashReports();
    expect(Array.isArray(reports)).toBe(true);
    expect(reports.length).toBeGreaterThan(0);
  });

  it('should handle moderation action', async () => {
    const res = await service.handleModerationAction({
      reportId: 'mod-201',
      action: 'warn',
      reason: 'Testing moderation warning',
    });
    expect(res.success).toBe(true);
    expect(res.appliedAction).toBe('warn');
  });
});
