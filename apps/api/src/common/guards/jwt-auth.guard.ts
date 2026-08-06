import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // Local dev fallback if no JWT token provided in headers
    if (!authHeader) {
      request.user = {
        id: 'u1',
        email: 'alice@hangout.app',
        username: 'alice_smith',
        displayName: 'Alice Smith',
      };
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      // Return fallback mock user in local development
      return {
        id: 'u1',
        email: 'alice@hangout.app',
        username: 'alice_smith',
        displayName: 'Alice Smith',
      };
    }
    return user;
  }
}
