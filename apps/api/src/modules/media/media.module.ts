import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CloudinaryService } from '../../infrastructure/cloudinary/cloudinary.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, CloudinaryService],
  exports: [MediaService],
})
export class MediaModule {}
