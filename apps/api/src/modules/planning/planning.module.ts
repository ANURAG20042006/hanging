import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { PlanningGateway } from './planning.gateway';
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
  controllers: [PlanningController],
  providers: [PlanningService, PlanningGateway],
  exports: [PlanningService],
})
export class PlanningModule {}
