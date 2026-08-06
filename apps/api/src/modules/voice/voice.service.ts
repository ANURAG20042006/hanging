import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessToken } from 'livekit-server-sdk';

@Injectable()
export class VoiceService {
  constructor(private configService: ConfigService) {}

  async generateToken(roomName: string, participantName: string, participantIdentity: string) {
    const apiKey = this.configService.get('LIVEKIT_API_KEY');
    const apiSecret = this.configService.get('LIVEKIT_API_SECRET');

    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantIdentity,
      name: participantName,
    });
    
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    
    return { token: await at.toJwt() };
  }
}
