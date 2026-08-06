import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../infrastructure/cloudinary/cloudinary.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(
    private cloudinaryService: CloudinaryService,
    private prisma: PrismaService,
  ) {}

  async uploadFile(file: Express.Multer.File, userId: string) {
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    // const media = await this.prisma.media.create({
    //   data: {
    //     url: uploadResult.secure_url,
    //     publicId: uploadResult.public_id,
    //     userId,
    //   },
    // });
    return { url: uploadResult.secure_url, id: 'mock-media-id' };
  }

  async getMedia(id: string) {
    // return this.prisma.media.findUnique({ where: { id } });
    return { id, url: 'mock-url' };
  }

  async deleteMedia(id: string, userId: string) {
    // const media = await this.prisma.media.findUnique({ where: { id } });
    // if (media?.publicId) await this.cloudinaryService.deleteImage(media.publicId);
    // await this.prisma.media.delete({ where: { id } });
    return { success: true };
  }
}
