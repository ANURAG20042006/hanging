import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  allowedUserIds?: string[];
  description: string;
}

const DEFAULT_FLAGS: FeatureFlag[] = [
  {
    key: 'ai_assistant_v2',
    enabled: true,
    rolloutPercentage: 100,
    description: 'AI Brain v2 with Gemini Pro integration',
  },
  {
    key: 'spatial_voice',
    enabled: true,
    rolloutPercentage: 100,
    description: '3D spatial voice attenuation in Clubhouse',
  },
  {
    key: 'kafka_events',
    enabled: true,
    rolloutPercentage: 100,
    description: 'Publish real-time events via Kafka instead of direct WebSocket',
  },
  {
    key: 'canary_clubhouse_v2',
    enabled: false,
    rolloutPercentage: 5,
    description: 'Clubhouse v2 with full Three.js WebGL rendering (canary)',
  },
  {
    key: 'biometric_login',
    enabled: true,
    rolloutPercentage: 100,
    description: 'Face ID / Touch ID biometric authentication',
  },
  {
    key: 'advanced_analytics',
    enabled: false,
    rolloutPercentage: 0,
    description: 'Advanced squad analytics dashboard (internal beta)',
  },
];

@Injectable()
export class FeatureFlagsService {
  private readonly logger = new Logger(FeatureFlagsService.name);
  private flags: Map<string, FeatureFlag> = new Map();

  constructor(private readonly prisma: PrismaService) {
    this.loadFlags();
  }

  private loadFlags() {
    DEFAULT_FLAGS.forEach((flag) => {
      this.flags.set(flag.key, flag);
    });
    this.logger.log(`Loaded ${this.flags.size} feature flags`);
  }

  isEnabled(key: string, userId?: string): boolean {
    const flag = this.flags.get(key);
    if (!flag) return false;
    if (!flag.enabled) return false;

    // Specific user override
    if (userId && flag.allowedUserIds?.includes(userId)) return true;

    // Percentage rollout (deterministic per-user hash)
    if (flag.rolloutPercentage < 100) {
      const hash = userId
        ? this.hashUserId(userId, key)
        : Math.random() * 100;
      return hash <= flag.rolloutPercentage;
    }

    return true;
  }

  getAllFlags(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }

  getFlag(key: string): FeatureFlag | undefined {
    return this.flags.get(key);
  }

  // Deterministic hash so same user always gets same bucket
  private hashUserId(userId: string, flagKey: string): number {
    const str = `${userId}:${flagKey}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 100;
  }
}
