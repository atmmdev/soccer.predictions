import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { ResendVerificationDto } from '../dtos/resend-verification.dto.js';
import type { VerifyEmailDto } from '../dtos/verify-email.dto.js';
import type {
  AuthResponse,
  AuthUser,
  JwtPayload,
} from '../types/auth-user.js';
import { AuthMailService } from './auth-mail.service.js';

const VERIFY_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 2 * 60 * 1000;

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly authMailService: AuthMailService,
  ) {}

  async createAndSendWelcomeVerification(user: {
    id: number;
    email: string;
    name: string;
  }): Promise<void> {
    const rawToken = await this.rotateVerificationToken(user.id);
    await this.authMailService.sendWelcomeVerification({
      userId: user.id,
      email: user.email,
      name: user.name,
      rawToken,
    });
  }

  async verifyEmail(dto: VerifyEmailDto): Promise<AuthResponse> {
    const tokenHash = this.authMailService.hashToken(dto.token);

    const verification = await this.prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!verification || verification.usedAt) {
      throw new UnauthorizedException('Link de validação inválido ou expirado');
    }

    if (verification.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Link de validação inválido ou expirado');
    }

    const user = await this.prisma.$transaction(async (tx) => {
      await tx.emailVerificationToken.update({
        where: { id: verification.id },
        data: { usedAt: new Date() },
      });

      return tx.user.update({
        where: { id: verification.userId },
        data: {
          emailVerifiedAt: verification.user.emailVerifiedAt ?? new Date(),
        },
      });
    });

    return this.buildAuthResponse(user);
  }

  async resendVerification(
    dto: ResendVerificationDto,
  ): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || user.authProvider !== 'LOCAL' || user.emailVerifiedAt) {
      return {
        message:
          'Se o e-mail estiver pendente de validação, enviaremos um novo link.',
      };
    }

    const latest = await this.prisma.emailVerificationToken.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    if (
      latest &&
      Date.now() - latest.createdAt.getTime() < RESEND_COOLDOWN_MS
    ) {
      throw new BadRequestException(
        'Aguarde alguns minutos antes de solicitar um novo e-mail de validação.',
      );
    }

    const rawToken = await this.rotateVerificationToken(user.id);
    await this.authMailService.sendVerificationResend({
      userId: user.id,
      email: user.email,
      name: user.name,
      rawToken,
    });

    return {
      message:
        'Se o e-mail estiver pendente de validação, enviaremos um novo link.',
    };
  }

  private async rotateVerificationToken(userId: number): Promise<string> {
    await this.prisma.emailVerificationToken.updateMany({
      where: {
        userId,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });

    const rawToken = this.authMailService.createRawToken();
    const tokenHash = this.authMailService.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + VERIFY_TOKEN_TTL_MS);

    await this.prisma.emailVerificationToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });

    return rawToken;
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
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatarDataUrl: user.avatarDataUrl,
        role: user.role,
      },
    };
  }
}
