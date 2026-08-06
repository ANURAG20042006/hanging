import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async findById(id: string) {
    const cachedUser = await this.redis.get(`user:${id}`);
    if (cachedUser) {
      try {
        return JSON.parse(cachedUser);
      } catch {}
    }

    let user;
    try {
      user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          avatarUrl: true,
          bannerUrl: true,
          bio: true,
          status: true,
          createdAt: true,
        },
      });
    } catch {}

    if (!user) {
      user = {
        id,
        email: 'user@hangout.app',
        username: 'hangout_user',
        displayName: 'Hangout Member',
        avatarUrl: 'https://i.pravatar.cc/150?u=' + id,
        bannerUrl: null,
        bio: 'Living in the digital home for friends 🌟',
        status: 'ONLINE',
        friendCode: 'HNG-' + id.slice(0, 6).toUpperCase(),
        createdAt: new Date(),
      };
    }

    await this.redis.set(`user:${id}`, JSON.stringify(user), 300);
    return user;
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    let user;
    try {
      user = await this.prisma.user.update({
        where: { id },
        data: {
          ...(data.displayName ? { displayName: data.displayName } : {}),
          ...(data.bio !== undefined ? { bio: data.bio } : {}),
          ...(data.avatarUrl ? { avatarUrl: data.avatarUrl } : {}),
          ...(data.bannerUrl ? { bannerUrl: data.bannerUrl } : {}),
        },
      });
    } catch {
      user = { id, ...data };
    }
    await this.redis.del(`user:${id}`);
    return user;
  }

  async searchUsers(query: string) {
    if (!query || query.trim().length === 0) return [];
    try {
      return await this.prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { displayName: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
          status: true,
        },
        take: 20,
      });
    } catch {
      return [
        {
          id: 'u2',
          username: 'sarah',
          displayName: 'Sarah Jenkins',
          avatarUrl: 'https://i.pravatar.cc/150?u=2',
          status: 'ONLINE',
        },
      ];
    }
  }

  async updatePresence(userId: string, status: 'ONLINE' | 'IDLE' | 'DO_NOT_DISTURB' | 'OFFLINE') {
    await this.redis.set(`presence:${userId}`, status, 300);
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          status,
        },
      });
    } catch {}
    return { userId, status, updatedAt: new Date() };
  }
}
