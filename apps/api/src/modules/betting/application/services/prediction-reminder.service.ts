import { Injectable, Logger } from '@nestjs/common';

import { AuthMailService } from '../../../identity/application/services/auth-mail.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';

type PendingFixture = {
  homeTeam: string;
  awayTeam: string;
  kickoffLabel: string;
  poolName: string;
};

@Injectable()
export class PredictionReminderService {
  private readonly logger = new Logger(PredictionReminderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authMailService: AuthMailService,
  ) {}

  async sendDailyReminders(): Promise<void> {
    const now = new Date();
    const windowEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const memberships = await this.prisma.poolUser.findMany({
      where: {
        status: 'ACTIVE',
        pool: { status: 'ACTIVE' },
        user: {
          email: { not: { endsWith: '@oauth.soccer.local' } },
        },
      },
      include: {
        user: true,
        pool: {
          include: {
            championship: {
              include: {
                fixtures: {
                  where: {
                    status: 'SCHEDULED',
                    date: {
                      gte: now,
                      lte: windowEnd,
                    },
                  },
                  include: {
                    homeTeam: true,
                    awayTeam: true,
                  },
                  orderBy: { date: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    const byUser = new Map<
      number,
      { email: string; name: string; fixtures: PendingFixture[] }
    >();

    for (const membership of memberships) {
      const fixtures = membership.pool.championship.fixtures;
      if (fixtures.length === 0) {
        continue;
      }

      const fixtureIds = fixtures.map((fixture) => fixture.id);
      const existing = await this.prisma.prediction.findMany({
        where: {
          poolId: membership.poolId,
          userId: membership.userId,
          fixtureId: { in: fixtureIds },
        },
        select: { fixtureId: true },
      });
      const predicted = new Set(existing.map((row) => row.fixtureId));

      const pending = fixtures
        .filter((fixture) => !predicted.has(fixture.id))
        .map((fixture) => ({
          homeTeam: fixture.homeTeam.name,
          awayTeam: fixture.awayTeam.name,
          kickoffLabel: this.formatKickoff(fixture.date),
          poolName: membership.pool.name,
        }));

      if (pending.length === 0) {
        continue;
      }

      const current = byUser.get(membership.userId) ?? {
        email: membership.user.email,
        name: membership.user.name,
        fixtures: [],
      };
      current.fixtures.push(...pending);
      byUser.set(membership.userId, current);
    }

    let sent = 0;
    for (const [userId, payload] of byUser) {
      try {
        const ok = await this.authMailService.sendPredictionReminder({
          userId,
          email: payload.email,
          name: payload.name,
          fixtures: payload.fixtures,
        });
        if (ok) {
          sent += 1;
        }
      } catch (error) {
        this.logger.warn(
          `Falha ao enviar lembrete para user=${userId}: ${String(error)}`,
        );
      }
    }

    this.logger.log(
      `Lembretes de palpite: ${sent} enviados de ${byUser.size} candidatos`,
    );
  }

  private formatKickoff(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}
