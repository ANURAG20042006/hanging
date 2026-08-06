import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
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
  controllers: [DevicesController],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
