import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createMessage(channelId: string, userId: string, content: string) {
    // const message = await this.prisma.message.create({
    //   data: { content, channelId, userId },
    // });
    return { id: uuidv4(), content, channelId, userId, createdAt: new Date() };
  }

  async getMessages(channelId: string, cursor?: string, limit = 50) {
    // Implement cursor-based pagination
    // return this.prisma.message.findMany({
    //   take: limit,
    //   skip: cursor ? 1 : 0,
    //   cursor: cursor ? { id: cursor } : undefined,
    //   where: { channelId },
    //   orderBy: { createdAt: 'desc' },
    // });
    return { data: [], nextCursor: null };
  }
}
