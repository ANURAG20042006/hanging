import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(registerDto: any) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    // return this.prisma.user.create({ ... })
    return { message: 'User registered' };
  }

  async login(loginDto: any) {
    // const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
    // if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    
    const payload = { email: loginDto.email, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
