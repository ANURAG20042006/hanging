import { Controller, Get, Patch, Body, Param, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@CurrentUser('userId') userId: string) {
    return this.usersService.findById(userId);
  }

  @Patch('me')
  async updateProfile(
    @CurrentUser('userId') userId: string,
    @Body() updateDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(userId, updateDto);
  }

  @Get('search')
  async searchUsers(@Query('q') query: string) {
    return this.usersService.searchUsers(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
