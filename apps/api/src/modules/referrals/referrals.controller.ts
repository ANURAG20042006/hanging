import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReferralsService } from './referrals.service';

@ApiTags('referrals')
@Controller('referrals')
export class ReferralsController {
  constructor(private readonly referralsService: ReferralsService) {}

  @Get('my-code')
  @ApiOperation({ summary: 'Get current user invite code & stats' })
  getMyReferralStats() {
    return this.referralsService.getMyReferralStats();
  }

  @Post('claim')
  @ApiOperation({ summary: 'Claim invite code during signup or onboarding' })
  claimReferralCode(@Body() body: { inviteCode: string }) {
    return this.referralsService.claimReferralCode(body.inviteCode);
  }
}
