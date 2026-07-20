import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export type SendMailInput = {
  to: string;
  subject: string;
  html: string;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend | null;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resend = apiKey ? new Resend(apiKey) : null;
  }

  isEnabled(): boolean {
    return this.configService.get<string>('EMAIL_ENABLED', 'false') === 'true';
  }

  async send(input: SendMailInput): Promise<boolean> {
    if (!this.isEnabled()) {
      this.logger.log(
        `[email disabled] to=${input.to} subject="${input.subject}"`,
      );
      const links = [...input.html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(
        (match) => match[1],
      );
      for (const link of links) {
        this.logger.log(`Link: ${link}`);
      }
      return false;
    }

    const from = this.configService.getOrThrow<string>('MAIL_FROM');

    if (!this.resend) {
      this.logger.warn(
        `EMAIL_ENABLED=true mas RESEND_API_KEY ausente. E-mail para ${input.to} não enviado.`,
      );
      this.logger.log(`subject="${input.subject}" to=${input.to}`);
      return false;
    }

    const result = await this.resend.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html,
    });

    if (result.error) {
      this.logger.error(
        `Falha ao enviar e-mail para ${input.to}: ${result.error.message}`,
      );
      throw new Error(result.error.message);
    }

    return true;
  }
}
