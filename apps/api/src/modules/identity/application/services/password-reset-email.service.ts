import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordResetEmailService {
  private readonly logger = new Logger(PasswordResetEmailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendResetLink(email: string, resetUrl: string): Promise<void> {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');

    if (nodeEnv !== 'production') {
      this.logger.log(`Link de redefinição para ${email}: ${resetUrl}`);
      return;
    }

    // Produção: integrar SMTP/Resend quando configurado (PASSWORD_RESET_EMAIL_ENABLED)
    this.logger.warn(
      `Envio de e-mail não configurado. Link de redefinição para ${email} não enviado.`,
    );
  }
}
