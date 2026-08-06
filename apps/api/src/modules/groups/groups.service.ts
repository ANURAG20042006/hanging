import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async createGroup(userId: string, dto: CreateGroupDto) {
    // return this.prisma.group.create({
    //   data: {
    //     ...dto,
    //     members: { create: { userId, role: 'ADMIN' } },
    //   },
    // });
    return { id: uuidv4(), ...dto, members: [{ userId, role: 'ADMIN' }] };
  }

  async getUserGroups(userId: string) {
    // return this.prisma.group.findMany({
    //   where: { members: { some: { userId } } }
    // });
    return [];
  }

  async getGroupDetails(id: string) {
    // const group = await this.prisma.group.findUnique({ where: { id }, include: { members: true, channels: true } });
    // if (!group) throw new NotFoundException('Group not found');
    return { id, name: 'Mock Group' };
  }

  async generateInvite(groupId: string, userId: string) {
    // Role check logic here
    const inviteCode = uuidv4();
    // Save invite to DB
    return { inviteCode };
  }

  async joinGroup(inviteCode: string, userId: string) {
    // validate invite code and add user
    return { success: true, groupId: 'mock-id' };
  }
}
