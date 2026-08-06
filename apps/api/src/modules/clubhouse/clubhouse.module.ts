import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ClubhouseController } from './clubhouse.controller';
import { ClubhouseService } from './clubhouse.service';
import { ClubhouseGateway } from './clubhouse.gateway';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key-for-hangout-app',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ClubhouseController],
  providers: [ClubhouseService, ClubhouseGateway],
  exports: [ClubhouseService],
})
export class ClubhouseModule {}
