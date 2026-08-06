import { Controller, Post, Get, Body, Param, UseGuards, Patch, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  async createGroup(@CurrentUser('userId') userId: string, @Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(userId, dto);
  }

  @Get()
  async getUserGroups(@CurrentUser('userId') userId: string) {
    return this.groupsService.getUserGroups(userId);
  }

  @Get(':id')
  async getGroupDetails(@Param('id') id: string) {
    return this.groupsService.getGroupDetails(id);
  }

  @Post(':id/invite')
  async generateInviteLink(@Param('id') id: string, @CurrentUser('userId') userId: string) {
    return this.groupsService.generateInvite(id, userId);
  }

  @Post('join/:inviteCode')
  async joinGroup(@Param('inviteCode') inviteCode: string, @CurrentUser('userId') userId: string) {
    return this.groupsService.joinGroup(inviteCode, userId);
  }
}
