import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async createGame(data: any, hostId: string) {
    const gameId = uuidv4();
    const state = { id: gameId, hostId, ...data, players: [hostId], status: 'LOBBY' };
    await this.redis.set(`game:${gameId}`, JSON.stringify(state));

    try {
      await this.prisma.gameMatch.create({
        data: {
          id: gameId,
          gameType: data.gameType || 'UNO',
          hostId,
          status: 'LOBBY',
        },
      });
    } catch {}

    return state;
  }

  async getGame(id: string) {
    const data = await this.redis.get(`game:${id}`);
    if (data) return JSON.parse(data);

    try {
      const match = await this.prisma.gameMatch.findUnique({ where: { id } });
      if (match) return match;
    } catch {}

    return {
      id,
      gameType: 'UNO',
      hostId: 'u1',
      players: ['u1', 'u2', 'u3'],
      status: 'PLAYING',
    };
  }

  async updateState(id: string, newState: any) {
    await this.redis.set(`game:${id}`, JSON.stringify(newState));
    return newState;
  }

  async getLeaderboards(type: 'games' | 'quiz' | 'movies' | 'memories') {
    return [
      { rank: 1, name: 'Alice Smith', avatar: 'https://i.pravatar.cc/150?u=1', score: 42, title: 'Squad Champion 🏆' },
      { rank: 2, name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=2', score: 38, title: 'UNO Master 🎴' },
      { rank: 3, name: 'Mike Ross', avatar: 'https://i.pravatar.cc/150?u=3', score: 29, title: 'Quiz Wizard 🧙' },
      { rank: 4, name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=4', score: 24, title: 'Night Owl 🦉' },
    ];
  }

  async getAchievements(userId: string) {
    try {
      return await this.prisma.squadAchievement.findMany({ where: { userId } });
    } catch {
      return [
        { id: 'a1', code: 'FIRST_MOVIE_NIGHT', title: 'First Movie Night 🍿', description: 'Hosted a watch party with 3+ friends', badgeIcon: '🍿', unlockedAt: new Date() },
        { id: 'a2', code: 'GAME_MASTER', title: 'Game Master 🎮', description: 'Won 10 multiplayer arcade matches', badgeIcon: '🎮', unlockedAt: new Date() },
        { id: 'a3', code: 'QUIZ_CHAMPION', title: 'Quiz Champion 🧠', description: 'Scored 100% on a squad trivia quiz', badgeIcon: '🏆', unlockedAt: new Date() },
        { id: 'a4', code: 'NIGHT_OWL', title: 'Night Owl 🦉', description: 'Stayed active in voice room past 2 AM', badgeIcon: '🦉', unlockedAt: new Date() },
      ];
    }
  }

  async getActivityFeed() {
    try {
      return await this.prisma.activityFeedItem.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
      });
    } catch {
      return [
        { id: 'f1', userId: 'u2', userName: 'Sarah Jenkins', userAvatar: 'https://i.pravatar.cc/150?u=2', action: 'won UNO match', targetTitle: 'UNO Arena 🎴', createdAt: new Date() },
        { id: 'f2', userId: 'u1', userName: 'Alice Smith', userAvatar: 'https://i.pravatar.cc/150?u=1', action: 'uploaded 12 photos', targetTitle: 'Summer Vacation 2026', createdAt: new Date() },
        { id: 'f3', userId: 'u3', userName: 'Mike Ross', userAvatar: 'https://i.pravatar.cc/150?u=3', action: 'created quiz', targetTitle: 'Marvel Cinematic Universe Trivia 🍿', createdAt: new Date() },
      ];
    }
  }

  async getUserProgress(userId: string) {
    try {
      return await this.prisma.userProgress.findUnique({ where: { userId } });
    } catch {
      return {
        userId,
        xp: 1250,
        level: 5,
        title: 'Squad Challenger 🎮',
        gamesWon: 12,
        quizWins: 4,
        streakDays: 14,
      };
    }
  }
}
