import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async createEvent(dto: any, userId: string) {
    return { id: 'mock-event', ...dto, creatorId: userId };
  }

  async getEvent(id: string) {
    return { id, title: 'Mock Event' };
  }

  async rsvp(eventId: string, userId: string, status: string) {
    return { eventId, userId, status };
  }
}
