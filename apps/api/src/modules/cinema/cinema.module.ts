import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { CinemaGateway } from './cinema.gateway';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CinemaController],
  providers: [CinemaService, CinemaGateway],
  exports: [CinemaService],
})
export class CinemaModule {}
