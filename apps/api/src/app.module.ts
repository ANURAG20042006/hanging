import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';

// Root Controller
import { AppController } from './app.controller';

// Infrastructure
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { RedisModule } from './infrastructure/redis/redis.module';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FriendsModule } from './modules/friends/friends.module';
import { GroupsModule } from './modules/groups/groups.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { ChatModule } from './modules/chat/chat.module';
import { MediaModule } from './modules/media/media.module';
import { EventsModule } from './modules/events/events.module';
import { VoiceModule } from './modules/voice/voice.module';
import { GamesModule } from './modules/games/games.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AiModule } from './modules/ai/ai.module';
import { SearchModule } from './modules/search/search.module';
import { CinemaModule } from './modules/cinema/cinema.module';
import { PlanningModule } from './modules/planning/planning.module';
import { ClubhouseModule } from './modules/clubhouse/clubhouse.module';
import { DevicesModule } from './modules/devices/devices.module';
import { FeatureFlagsModule } from './modules/feature-flags/feature-flags.module';
import { AdminModule } from './modules/admin/admin.module';
import { SupportModule } from './modules/support/support.module';
import { ReferralsModule } from './modules/referrals/referrals.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Throttling (Rate Limiting)
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 100,
    }]),

    // Caching (In-memory fallback with TTL)
    CacheModule.register({
      isGlobal: true,
      ttl: 300 * 1000, // 5 minutes in milliseconds
      max: 1000,
    }),
    
    // Scheduling
    ScheduleModule.forRoot(),

    // Infrastructure
    PrismaModule,
    RedisModule,

    // Features
    AuthModule,
    UsersModule,
    FriendsModule,
    GroupsModule,
    ChannelsModule,
    ChatModule,
    MediaModule,
    EventsModule,
    VoiceModule,
    GamesModule,
    NotificationsModule,
    AiModule,
    SearchModule,
    CinemaModule,
    PlanningModule,
    ClubhouseModule,
    DevicesModule,
    FeatureFlagsModule,
    AdminModule,
    SupportModule,
    ReferralsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
