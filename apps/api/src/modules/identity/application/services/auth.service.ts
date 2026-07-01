import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { LoginDto } from '../dtos/login.dto.js';
import type { RegisterDto } from '../dtos/register.dto.js';
import type {
  AuthResponse,
  AuthUser,
  JwtPayload,
} from '../types/auth-user.js';
import type { OAuthProfile } from '../types/oauth-profile.js';

const PASSWORD_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const passwordHash = await hash(dto.password, PASSWORD_SALT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: passwordHash,
        authProvider: 'LOCAL',
        role: 'PARTICIPANT',
      },
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.password) {
      throw new UnauthorizedException(
        'Esta conta usa login social. Entre com Google ou Instagram.',
      );
    }

    const passwordMatches = await compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.buildAuthResponse(user);
  }

  async validateOAuthLogin(profile: OAuthProfile): Promise<AuthUser> {
    const existingOAuthUser = await this.prisma.user.findFirst({
      where: {
        authProvider: profile.provider,
        providerId: profile.providerId,
      },
    });

    if (existingOAuthUser) {
      return this.toAuthUser(existingOAuthUser);
    }

    if (profile.email) {
      const existingEmailUser = await this.prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (existingEmailUser) {
        const linkedUser = await this.prisma.user.update({
          where: { id: existingEmailUser.id },
          data: {
            authProvider: profile.provider,
            providerId: profile.providerId,
            name: existingEmailUser.name || profile.name,
            password: null,
          },
        });

        return this.toAuthUser(linkedUser);
      }
    }

    const email =
      profile.email ??
      `${profile.provider.toLowerCase()}_${profile.providerId}@oauth.soccer.local`;

    const user = await this.prisma.user.create({
      data: {
        name: profile.name,
        email,
        authProvider: profile.provider,
        providerId: profile.providerId,
        password: null,
      },
    });

    return this.toAuthUser(user);
  }

  async validateUser(userId: number): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return this.toAuthUser(user);
  }

  buildAuthResponseFromUser(user: AuthUser): AuthResponse {
    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: {
    id: number;
    email: string;
    name: string;
    role: AuthUser['role'];
  }): AuthResponse {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: this.toAuthUser(user),
    };
  }

  private toAuthUser(user: {
    id: number;
    email: string;
    name: string;
    role: AuthUser['role'];
  }): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
