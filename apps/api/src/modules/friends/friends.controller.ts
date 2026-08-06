import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Friends')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user friends list' })
  getFriends(@CurrentUser('id') userId: string) {
    return this.friendsService.getFriendsList(userId);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get pending incoming friend requests' })
  getPendingRequests(@CurrentUser('id') userId: string) {
    return this.friendsService.getPendingRequests(userId);
  }

  @Post('request')
  @ApiOperation({ summary: 'Send a friend request by user ID or Friend Code' })
  sendRequest(
    @CurrentUser('id') userId: string,
    @Body('friendCodeOrId') friendCodeOrId: string,
  ) {
    return this.friendsService.sendFriendRequest(userId, friendCodeOrId);
  }

  @Patch('request/:id')
  @ApiOperation({ summary: 'Accept or reject incoming friend request' })
  respondToRequest(
    @CurrentUser('id') userId: string,
    @Param('id') requestId: string,
    @Body('action') action: 'ACCEPT' | 'REJECT',
  ) {
    return this.friendsService.respondToRequest(userId, requestId, action);
  }

  @Post('block/:targetId')
  @ApiOperation({ summary: 'Block a user' })
  blockUser(
    @CurrentUser('id') userId: string,
    @Param('targetId') targetId: string,
  ) {
    return this.friendsService.blockUser(userId, targetId);
  }
}
