import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async search(query: string, types?: string[]) {
    // PostgreSQL full-text search with pg_trgm placeholder
    return {
      results: [
        { type: 'user', id: '1', match: 'Mock Search Result' }
      ]
    };
  }
}
