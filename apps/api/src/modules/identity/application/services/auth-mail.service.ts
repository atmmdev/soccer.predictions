import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomBytes } from 'node:crypto';

import { MailService } from '../../../../shared/mail/mail.service.js';
import {
  passwordChangedEmail,
  passwordResetEmail,
  predictionReminderEmail,
  welcomeVerifyEmail,
} from '../../../../shared/mail/mail.templates.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';

@Injectable()
export class AuthMailService {
  private readonly logger = new Logger(AuthMailService.name);

  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  getWebOrigin(): string {
    return this.configService.getOrThrow<string>('WEB_ORIGIN');
  }

  async sendWelcomeVerification(params: {
    userId: number;
    email: string;
    name: string;
    rawToken: string;
  }): Promise<void> {
    const verifyUrl = new URL('/verify-email', this.getWebOrigin());
    verifyUrl.searchParams.set('token', params.rawToken);

    const template = welcomeVerifyEmail({
      name: params.name,
      verifyUrl: verifyUrl.toString(),
    });

    await this.mailService.send({
      to: params.email,
      subject: template.subject,
      html: template.html,
    });

    await this.tryLogDispatch(params.userId, 'WELCOME_VERIFY');
  }

  async sendVerificationResend(params: {
    userId: number;
    email: string;
    name: string;
    rawToken: string;
  }): Promise<void> {
    const verifyUrl = new URL('/verify-email', this.getWebOrigin());
    verifyUrl.searchParams.set('token', params.rawToken);

    const template = welcomeVerifyEmail({
      name: params.name,
      verifyUrl: verifyUrl.toString(),
    });

    await this.mailService.send({
      to: params.email,
      subject: template.subject,
      html: template.html,
    });

    await this.tryLogDispatch(params.userId, 'VERIFICATION_RESEND');
  }

  async sendPasswordReset(params: {
    userId: number;
    email: string;
    name: string;
    resetUrl: string;
  }): Promise<void> {
    const template = passwordResetEmail({
      name: params.name,
      resetUrl: params.resetUrl,
    });

    await this.mailService.send({
      to: params.email,
      subject: template.subject,
      html: template.html,
    });

    await this.tryLogDispatch(params.userId, 'PASSWORD_RESET');
  }

  async sendPasswordChanged(params: {
    userId: number;
    email: string;
    name: string;
  }): Promise<void> {
    const template = passwordChangedEmail({ name: params.name });

    await this.mailService.send({
      to: params.email,
      subject: template.subject,
      html: template.html,
    });

    await this.tryLogDispatch(params.userId, 'PASSWORD_CHANGED');
  }

  async sendPredictionReminder(params: {
    userId: number;
    email: string;
    name: string;
    fixtures: Array<{
      homeTeam: string;
      awayTeam: string;
      kickoffLabel: string;
      poolName: string;
    }>;
  }): Promise<boolean> {
    const dayKey = this.todayKeyAmericaSaoPaulo();
    const alreadySent = await this.prisma.emailDispatchLog.findUnique({
      where: {
        userId_type_dayKey: {
          userId: params.userId,
          type: 'PREDICTION_REMINDER',
          dayKey,
        },
      },
    });

    if (alreadySent) {
      return false;
    }

    const predictionsUrl = new URL('/predictions', this.getWebOrigin()).toString();
    const template = predictionReminderEmail({
      name: params.name,
      predictionsUrl,
      fixtures: params.fixtures,
    });

    await this.mailService.send({
      to: params.email,
      subject: template.subject,
      html: template.html,
    });

    await this.prisma.emailDispatchLog.create({
      data: {
        userId: params.userId,
        type: 'PREDICTION_REMINDER',
        dayKey,
      },
    });

    return true;
  }

  createRawToken(): string {
    return randomBytes(32).toString('hex');
  }

  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  todayKeyAmericaSaoPaulo(date = new Date()): string {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }

  private async tryLogDispatch(
    userId: number,
    type:
      | 'WELCOME_VERIFY'
      | 'PASSWORD_RESET'
      | 'PASSWORD_CHANGED'
      | 'VERIFICATION_RESEND',
  ): Promise<void> {
    try {
      await this.prisma.emailDispatchLog.create({
        data: {
          userId,
          type,
          dayKey: this.todayKeyAmericaSaoPaulo(),
        },
      });
    } catch (error) {
      this.logger.debug(
        `Dispatch log skip for user=${userId} type=${type}: ${String(error)}`,
      );
    }
  }
}
