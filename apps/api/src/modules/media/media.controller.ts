import { Controller, Post, Get, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @CurrentUser('userId') userId: string) {
    if (!file) throw new BadRequestException('No file provided');
    return this.mediaService.uploadFile(file, userId);
  }

  @Get(':id')
  async getMedia(@Param('id') id: string) {
    return this.mediaService.getMedia(id);
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.mediaService.deleteMedia(id, userId);
  }
}
