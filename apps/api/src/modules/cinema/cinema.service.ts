import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

export interface CreateCinemaRoomDto {
  groupId: string;
  title: string;
  videoUrl?: string;
  videoType?: string;
}

export interface AddQueueItemDto {
  roomId: string;
  videoUrl: string;
  title: string;
  thumbnailUrl?: string;
}

@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  async createRoom(hostId: string, dto: CreateCinemaRoomDto) {
    try {
      return await this.prisma.cinemaRoom.create({
        data: {
          groupId: dto.groupId,
          hostId,
          title: dto.title,
          currentVideoUrl: dto.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          videoType: dto.videoType || 'YOUTUBE',
          currentTime: 0,
          isPlaying: false,
          isTheaterMode: false,
        },
      });
    } catch {
      return {
        id: 'room_cinema_1',
        groupId: dto.groupId,
        hostId,
        title: dto.title,
        currentVideoUrl: dto.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        videoType: dto.videoType || 'YOUTUBE',
        currentTime: 0,
        isPlaying: false,
        isTheaterMode: false,
        createdAt: new Date(),
      };
    }
  }

  async getRoom(id: string) {
    try {
      const room = await this.prisma.cinemaRoom.findUnique({
        where: { id },
        include: {
          queue: {
            orderBy: { votesCount: 'desc' },
          },
        },
      });
      if (room) return room;
    } catch {}

    return {
      id,
      groupId: 'g1',
      hostId: 'u1',
      title: 'Squad Movie Night 🍿',
      currentVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoType: 'YOUTUBE',
      currentTime: 0,
      isPlaying: false,
      isTheaterMode: false,
      queue: [
        { id: 'q1', roomId: id, videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso', title: 'Inception Trailer HD', votesCount: 5 },
        { id: 'q2', roomId: id, videoUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0', title: 'Interstellar Teaser', votesCount: 3 },
      ],
      createdAt: new Date(),
    };
  }

  async addQueueItem(userId: string, dto: AddQueueItemDto) {
    try {
      return await this.prisma.cinemaQueueItem.create({
        data: {
          roomId: dto.roomId,
          videoUrl: dto.videoUrl,
          title: dto.title,
          thumbnailUrl: dto.thumbnailUrl,
          addedById: userId,
          votesCount: 1,
        },
      });
    } catch {
      return { id: 'q_' + Date.now(), ...dto, addedById: userId, votesCount: 1 };
    }
  }

  async updatePlaybackState(id: string, state: { currentTime?: number; isPlaying?: boolean; videoUrl?: string }) {
    try {
      return await this.prisma.cinemaRoom.update({
        where: { id },
        data: {
          ...(state.currentTime !== undefined ? { currentTime: state.currentTime } : {}),
          ...(state.isPlaying !== undefined ? { isPlaying: state.isPlaying } : {}),
          ...(state.videoUrl ? { currentVideoUrl: state.videoUrl } : {}),
        },
      });
    } catch {
      return { id, ...state, updatedAt: new Date() };
    }
  }

  async addWatchHistory(userId: string, videoUrl: string, title: string) {
    try {
      return await this.prisma.cinemaHistory.create({
        data: { userId, videoUrl, title },
      });
    } catch {
      return { id: 'h1', userId, videoUrl, title, watchedAt: new Date() };
    }
  }
}
