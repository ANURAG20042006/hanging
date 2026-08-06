import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis | null = null;
  private readonly logger = new Logger(RedisService.name);
  private memoryStore = new Map<string, string>();

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    try {
      const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
      this.client = new Redis(redisUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        retryStrategy: () => null, // Don't crash on retry failure
      });

      this.client.on('error', (err) => {
        this.logger.warn(`Redis connection unavailable: ${err.message}. Using in-memory fallback.`);
      });

      this.client.connect().catch((err) => {
        this.logger.warn(`Redis connect failed: ${err.message}. Using in-memory fallback.`);
      });
    } catch (e: any) {
      this.logger.warn(`Redis init error: ${e.message}. Using in-memory fallback.`);
    }
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.quit().catch(() => {});
    }
  }

  getClient(): Redis | null {
    return this.client;
  }
  
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (this.client && this.client.status === 'ready') {
        if (ttlSeconds) {
          await this.client.set(key, value, 'EX', ttlSeconds);
        } else {
          await this.client.set(key, value);
        }
        return;
      }
    } catch {}
    this.memoryStore.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    try {
      if (this.client && this.client.status === 'ready') {
        return await this.client.get(key);
      }
    } catch {}
    return this.memoryStore.get(key) || null;
  }
  
  async del(key: string): Promise<void> {
    try {
      if (this.client && this.client.status === 'ready') {
        await this.client.del(key);
        return;
      }
    } catch {}
    this.memoryStore.delete(key);
  }
}
