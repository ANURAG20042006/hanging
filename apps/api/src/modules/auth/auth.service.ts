import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(registerDto: any) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return { 
      message: 'User registered successfully', 
      user: { email: registerDto.email, username: registerDto.username || 'user' } 
    };
  }

  async login(loginDto: any) {
    const payload = { email: loginDto.email, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
      user: { email: loginDto.email }
    };
  }
}
