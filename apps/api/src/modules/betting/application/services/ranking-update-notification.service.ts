import { Injectable, Logger } from '@nestjs/common';

import { AuthMailService } from '../../../identity/application/services/auth-mail.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { compareRankingStandings } from '../utils/compare-ranking-standings.js';
import { ScoringService } from './scoring.service.js';

const TOP_STANDINGS_LIMIT = 10;
/** Mantém o lote abaixo do limite de ~2 req/s do Resend. */
const SEND_GAP_MS = 600;

type StandingEntry = {
  userId: number;
  email: string;
  name: string;
  points: number;
  exactScore: number;
  position: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable()
export class RankingUpdateNotificationService {
  private readonly logger = new Logger(RankingUpdateNotificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authMailService: AuthMailService,
  ) {}

  async notifyForChampionship(championshipId: number): Promise<void> {
    const pools = await this.prisma.pool.findMany({
      where: {
        championshipId,
        status: 'ACTIVE',
      },
      include: {
        championship: {
          select: { name: true },
        },
      },
    });

    if (pools.length === 0) {
      this.logger.log(
        `Nenhum pool ACTIVE para championship=${championshipId} — e-mails de ranking ignorados`,
      );
      return;
    }

    this.logger.log(
      `Notificando ranking de ${pools.length} pool(s) do championship=${championshipId}`,
    );

    for (const pool of pools) {
      try {
        await this.notifyForPool({
          poolId: pool.id,
          poolName: pool.name,
          championshipName: pool.championship.name,
        });
      } catch (error) {
        this.logger.warn(
          `Falha ao notificar ranking do pool=${pool.id}: ${String(error)}`,
        );
      }
    }
  }

  private async notifyForPool(params: {
    poolId: number;
    poolName: string;
    championshipName: string;
  }): Promise<void> {
    const members = await this.prisma.poolUser.findMany({
      where: {
        poolId: params.poolId,
        status: 'ACTIVE',
        user: {
          role: { not: 'SUPER_ADMIN' },
          email: { not: { endsWith: '@oauth.soccer.local' } },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (members.length === 0) {
      this.logger.warn(
        `Pool=${params.poolId} sem membros elegíveis para e-mail de ranking`,
      );
      return;
    }

    this.logger.log(
      `Preparando ranking update pool=${params.poolId} (${members.length} destinatários)`,
    );

    const ranked: StandingEntry[] = [];

    for (const member of members) {
      const pointHistory = await this.prisma.pointHistory.findMany({
        where: {
          poolId: params.poolId,
          userId: member.userId,
        },
        select: {
          points: true,
          breakdown: true,
        },
      });

      const aggregated = ScoringService.aggregateBreakdown(pointHistory);

      ranked.push({
        userId: member.userId,
        email: member.user.email,
        name: member.user.name,
        points: aggregated.points,
        exactScore: aggregated.achievements.exactScore,
        position: 0,
      });
    }

    ranked.sort((left, right) => compareRankingStandings(left, right));

    ranked.forEach((entry, index) => {
      entry.position = index + 1;
    });

    const topStandings = ranked.slice(0, TOP_STANDINGS_LIMIT);
    let sent = 0;
    let failed = 0;
    let skipped = 0;

    for (let index = 0; index < ranked.length; index += 1) {
      const entry = ranked[index]!;
      const standingsForRecipient = topStandings.map(row => ({
        position: row.position,
        name: row.name,
        points: row.points,
        isRecipient: row.userId === entry.userId,
      }));

      const recipientInTop = standingsForRecipient.some(
        row => row.isRecipient,
      );

      if (!recipientInTop) {
        standingsForRecipient.push({
          position: entry.position,
          name: entry.name,
          points: entry.points,
          isRecipient: true,
        });
      }

      try {
        const ok = await this.authMailService.sendRankingUpdated({
          userId: entry.userId,
          email: entry.email,
          name: entry.name,
          poolId: params.poolId,
          poolName: params.poolName,
          championshipName: params.championshipName,
          recipientPosition: entry.position,
          recipientPoints: entry.points,
          standings: standingsForRecipient,
        });

        if (ok) {
          sent += 1;
        } else {
          skipped += 1;
        }
      } catch (error) {
        failed += 1;
        this.logger.warn(
          `Falha ao enviar ranking para ${entry.email} (pool=${params.poolId}): ${String(error)}`,
        );
      }

      if (index < ranked.length - 1) {
        await sleep(SEND_GAP_MS);
      }
    }

    this.logger.log(
      `Ranking update emails pool=${params.poolId}: ${sent}/${ranked.length} enviados, ${skipped} ignorados, ${failed} falhas`,
    );
  }
}
