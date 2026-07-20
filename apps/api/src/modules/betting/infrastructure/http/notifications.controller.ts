import { Controller, Post, UseGuards } from '@nestjs/common';

import { Roles } from '../../../../shared/auth/roles.decorator.js';
import { RolesGuard } from '../../../../shared/auth/roles.guard.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import { PredictionReminderService } from '../../application/services/prediction-reminder.service.js';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class NotificationsController {
  constructor(
    private readonly predictionReminderService: PredictionReminderService,
  ) {}

  /** Disparo manual do lembrete de palpites (mesmo fluxo do cron 09:00). */
  @Post('prediction-reminders')
  async sendPredictionReminders(): Promise<{ ok: true }> {
    await this.predictionReminderService.sendDailyReminders();
    return { ok: true };
  }
}
