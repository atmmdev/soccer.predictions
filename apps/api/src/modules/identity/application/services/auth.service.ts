import {
  ConflictException,
  ForbiddenException,
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
import { fetchOAuthAvatarDataUrl } from '../utils/oauth-avatar.js';
import { EmailVerificationService } from './email-verification.service.js';

const PASSWORD_SALT_ROUNDS = 10;

export type RegisterResult =
  | AuthResponse
  | {
      message: string;
      requiresEmailVerification: true;
      email: string;
    };

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  async register(dto: RegisterDto): Promise<RegisterResult> {
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
        emailVerifiedAt: null,
      },
    });

    await this.emailVerificationService.createAndSendWelcomeVerification(user);

    return {
      message:
        'Conta criada. Enviamos um e-mail para validar seu endereço antes de entrar.',
      requiresEmailVerification: true,
      email: user.email,
    };
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

    if (user.authProvider === 'LOCAL' && !user.emailVerifiedAt) {
      throw new ForbiddenException({
        code: 'EMAIL_NOT_VERIFIED',
        message:
          'E-mail ainda não validado. Verifique sua caixa de entrada ou reenvie o link.',
      });
    }

    return this.buildAuthResponse(user);
  }

  async validateOAuthLogin(profile: OAuthProfile): Promise<AuthUser> {
    const importedAvatar = await fetchOAuthAvatarDataUrl(profile.avatarUrl);

    const existingOAuthUser = await this.prisma.user.findFirst({
      where: {
        authProvider: profile.provider,
        providerId: profile.providerId,
      },
    });

    if (existingOAuthUser) {
      const shouldImportAvatar =
        Boolean(importedAvatar) && !existingOAuthUser.avatarDataUrl;

      if (!existingOAuthUser.emailVerifiedAt || shouldImportAvatar) {
        const verified = await this.prisma.user.update({
          where: { id: existingOAuthUser.id },
          data: {
            ...(!existingOAuthUser.emailVerifiedAt
              ? { emailVerifiedAt: new Date() }
              : {}),
            ...(shouldImportAvatar
              ? { avatarDataUrl: importedAvatar }
              : {}),
          },
        });
        return this.toAuthUser(verified);
      }

      return this.toAuthUser(existingOAuthUser);
    }

    if (profile.email) {
      const existingEmailUser = await this.prisma.user.findUnique({
        where: { email: profile.email },
      });

      if (existingEmailUser) {
        const shouldImportAvatar =
          Boolean(importedAvatar) && !existingEmailUser.avatarDataUrl;

        const linkedUser = await this.prisma.user.update({
          where: { id: existingEmailUser.id },
          data: {
            authProvider: profile.provider,
            providerId: profile.providerId,
            name: existingEmailUser.name || profile.name,
            password: null,
            emailVerifiedAt: existingEmailUser.emailVerifiedAt ?? new Date(),
            ...(shouldImportAvatar
              ? { avatarDataUrl: importedAvatar }
              : {}),
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
        emailVerifiedAt: new Date(),
        ...(importedAvatar ? { avatarDataUrl: importedAvatar } : {}),
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
    phone: string | null;
    avatarDataUrl: string | null;
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
    phone: string | null;
    avatarDataUrl: string | null;
    role: AuthUser['role'];
  }): AuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarDataUrl: user.avatarDataUrl,
      role: user.role,
    };
  }
}
