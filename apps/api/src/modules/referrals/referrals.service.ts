import { Injectable } from '@nestjs/common';

@Injectable()
export class ReferralsService {
  async getMyReferralStats() {
    return {
      inviteCode: 'HANGOUT-ALEX-8821',
      inviteUrl: 'https://hangout.app/invite/HANGOUT-ALEX-8821',
      totalInvitesSent: 12,
      successfulClaims: 8,
      rewardsEarned: {
        badge: 'Community Ambassador',
        storageBonusGb: 25,
        exclusiveClubhouseSkinsUnlocked: 3,
      },
      invitedFriends: [
        { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150', joinedAt: '2 days ago', status: 'Active' },
        { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150', joinedAt: '1 week ago', status: 'Active' },
        { name: 'Sophia Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150', joinedAt: '2 weeks ago', status: 'Active' },
      ],
    };
  }

  async claimReferralCode(inviteCode: string) {
    return {
      success: true,
      inviteCode,
      bonusAwarded: '5GB Free Cloud Storage + VIP Clubhouse Badge',
      timestamp: new Date().toISOString(),
    };
  }
}
