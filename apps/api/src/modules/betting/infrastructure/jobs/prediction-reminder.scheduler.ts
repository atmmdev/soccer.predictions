import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PredictionReminderService } from '../../application/services/prediction-reminder.service.js';

@Injectable()
export class PredictionReminderScheduler {
  private readonly logger = new Logger(PredictionReminderScheduler.name);

  constructor(
    private readonly predictionReminderService: PredictionReminderService,
  ) {}

  @Cron('0 9 * * *', { timeZone: 'America/Sao_Paulo' })
  async sendMorningReminders(): Promise<void> {
    this.logger.log('Iniciando envio de lembretes de palpites');
    await this.predictionReminderService.sendDailyReminders();
  }
}
