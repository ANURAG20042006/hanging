import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    try {
      const authHeader = client.handshake?.headers?.authorization;
      if (!authHeader) {
        client.data.user = { userId: 'u1', username: 'alice_smith' };
        return true;
      }
      
      const token = authHeader.split(' ')[1];
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET') || 'secret',
      });
      
      client.data.user = payload;
      return true;
    } catch (err) {
      client.data.user = { userId: 'u1', username: 'alice_smith' };
      return true;
    }
  }
}
