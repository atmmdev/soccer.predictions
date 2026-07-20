import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';

import { SyncFixturesService } from '../../application/services/sync-fixtures.service.js';

@Injectable()
export class FixtureSyncScheduler {
  private readonly logger = new Logger(FixtureSyncScheduler.name);

  constructor(private readonly syncFixturesService: SyncFixturesService) {}

  @Cron('0 6 * * *', { timeZone: 'America/Sao_Paulo' })
  async syncMorning(): Promise<void> {
    this.logger.log('Iniciando sync matinal de fixtures');
    await this.syncFixturesService.syncActiveChampionships('all', {
      notifyRanking: false,
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncLive(): Promise<void> {
    await this.syncFixturesService.syncActiveChampionships('live');
  }

  @Cron('59 23 * * *', { timeZone: 'America/Sao_Paulo' })
  async syncNightly(): Promise<void> {
    this.logger.log(
      'Iniciando sync noturno de fixtures (com e-mails de classificação)',
    );
    await this.syncFixturesService.syncActiveChampionships('all', {
      notifyRanking: true,
    });
  }
}
