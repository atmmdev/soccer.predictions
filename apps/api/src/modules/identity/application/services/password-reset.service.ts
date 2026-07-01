import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'node:crypto';

import { hash } from 'bcryptjs';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { ForgotPasswordDto } from '../dtos/forgot-password.dto.js';
import type { ResetPasswordDto } from '../dtos/reset-password.dto.js';
import { PasswordResetEmailService } from './password-reset-email.service.js';

const PASSWORD_SALT_ROUNDS = 10;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: PasswordResetEmailService,
  ) {}

  async requestReset(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.password) {
      return this.genericSuccessMessage();
    }

    await this.prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    const webOrigin = this.configService.getOrThrow<string>('WEB_ORIGIN');
    const resetUrl = new URL('/reset-password', webOrigin);
    resetUrl.searchParams.set('token', rawToken);

    await this.emailService.sendResetLink(user.email, resetUrl.toString());

    return this.genericSuccessMessage();
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const tokenHash = this.hashToken(dto.token);

    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!resetToken || resetToken.usedAt) {
      throw new UnauthorizedException('Link de redefinição inválido ou expirado');
    }

    if (resetToken.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Link de redefinição inválido ou expirado');
    }

    if (!resetToken.user.password) {
      throw new BadRequestException(
        'Esta conta usa login social. Entre com Google ou Instagram.',
      );
    }

    const passwordHash = await hash(dto.password, PASSWORD_SALT_ROUNDS);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: passwordHash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return {
      message: 'Senha redefinida com sucesso. Você já pode entrar.',
    };
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private genericSuccessMessage(): { message: string } {
    return {
      message:
        'Se o e-mail estiver cadastrado, enviaremos instruções para redefinir a senha.',
    };
  }
}
