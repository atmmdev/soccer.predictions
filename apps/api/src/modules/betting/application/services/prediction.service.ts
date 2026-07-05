import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  FixtureStatus,
  Pool,
  Prediction,
} from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import type { SubmitPredictionDto } from '../dtos/submit-prediction.dto.js';
import {
  canEditPrediction,
  getPredictionLockMessage,
} from '../utils/prediction-window.js';
import { canViewMemberPrediction } from '../utils/prediction-visibility.js';
import { assertCanParticipateInPools } from '../../../../shared/auth/pool-participation.js';
import { RankingService } from './ranking.service.js';
import { ScoringService } from './scoring.service.js';

export interface PredictionFixtureResponse {
  id: number;
  poolId: number;
  poolName: string;
  poolPosition: number;
  participantId: number;
  participantName: string;
  isOwnPrediction: boolean;
  championshipName: string;
  round: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  matchStatus: 'SCHEDULED' | 'LIVE' | 'FINISHED';
  officialHomeScore: number | null;
  officialAwayScore: number | null;
  earnedPoints: number | null;
  prediction: {
    fixtureId: number;
    predictedHomeScore: number;
    predictedAwayScore: number;
    selectedPlayerId: number | null;
  } | null;
}

type PoolWithChampionship = Pool & {
  championship: { name: string };
};

@Injectable()
export class PredictionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rankingService: RankingService,
    private readonly scoringService: ScoringService,
  ) {}

  async listForUser(user: AuthUser): Promise<PredictionFixtureResponse[]> {
    const pools = await this.findAccessiblePools(user);

    if (pools.length === 0) {
      return [];
    }

    const poolIds = pools.map(pool => pool.id);
    const championshipIds = [...new Set(pools.map(pool => pool.championshipId))];

    await this.scoringService.syncPoolsScores(poolIds);

    const [fixtures, predictions, membersByPoolId, positions, earnedPointsByKey] =
      await Promise.all([
        this.prisma.fixture.findMany({
          where: {
            championshipId: { in: championshipIds },
            status: { in: ['SCHEDULED', 'LIVE', 'FINISHED'] },
          },
          include: {
            homeTeam: true,
            awayTeam: true,
            championship: true,
          },
          orderBy: { date: 'asc' },
        }),
        this.prisma.prediction.findMany({
          where: { poolId: { in: poolIds } },
        }),
        this.loadActiveMembersByPool(poolIds),
        this.rankingService.getPoolMemberPositions(poolIds, {
          syncScores: false,
        }),
        this.loadEarnedPointsByKey(poolIds),
      ]);

    const predictionsByKey = new Map<string, Prediction>();

    for (const prediction of predictions) {
      predictionsByKey.set(
        `${prediction.poolId}:${prediction.userId}:${prediction.fixtureId}`,
        prediction,
      );
    }

    const rows: PredictionFixtureResponse[] = [];

    for (const pool of pools) {
      const poolFixtures = fixtures.filter(
        fixture => fixture.championshipId === pool.championshipId,
      );
      const members = membersByPoolId.get(pool.id) ?? [];
      const viewAll = this.canViewAllPoolPredictions(user, pool);

      if (viewAll) {
        for (const fixture of poolFixtures) {
          for (const member of members) {
            const prediction =
              predictionsByKey.get(
                `${pool.id}:${member.id}:${fixture.id}`,
              ) ?? null;
            const canView = canViewMemberPrediction(
              user,
              pool,
              fixture,
              member.id,
            );

            rows.push(
              this.toFixtureRow({
                pool,
                fixture,
                member,
                userId: user.id,
                userRole: user.role,
                prediction: canView ? prediction : null,
                poolPosition:
                  positions.get(`${pool.id}:${member.id}`) ?? 0,
                earnedPoints: canView
                  ? (earnedPointsByKey.get(
                      `${pool.id}:${member.id}:${fixture.id}`,
                    ) ?? null)
                  : null,
              }),
            );
          }
        }

        continue;
      }

      const member =
        members.find(poolMember => poolMember.id === user.id) ?? {
          id: user.id,
          name: user.name,
        };

      for (const fixture of poolFixtures) {
        rows.push(
          this.toFixtureRow({
            pool,
            fixture,
            member,
            userId: user.id,
            userRole: user.role,
            prediction:
              predictionsByKey.get(`${pool.id}:${user.id}:${fixture.id}`) ??
              null,
            poolPosition: positions.get(`${pool.id}:${user.id}`) ?? 0,
            earnedPoints:
              earnedPointsByKey.get(`${pool.id}:${user.id}:${fixture.id}`) ??
              null,
          }),
        );
      }
    }

    return rows.sort((left, right) => {
      const dateDiff =
        new Date(left.date).getTime() - new Date(right.date).getTime();

      if (dateDiff !== 0) {
        return dateDiff;
      }

      if (left.poolName !== right.poolName) {
        return left.poolName.localeCompare(right.poolName);
      }

      return left.participantName.localeCompare(right.participantName);
    });
  }

  async submit(
    dto: SubmitPredictionDto,
    user: AuthUser,
  ): Promise<PredictionFixtureResponse> {
    assertCanParticipateInPools(user);

    const pool = await this.findAccessiblePoolById(dto.poolId, user);

    if (pool.status !== 'ACTIVE') {
      throw new ConflictException(
        pool.status === 'CLOSED'
          ? 'Este bolão está encerrado e não aceita palpites'
          : 'Este bolão está inativo e não aceita palpites',
      );
    }

    const fixture = await this.prisma.fixture.findUnique({
      where: { id: dto.fixtureId },
      include: {
        homeTeam: true,
        awayTeam: true,
        championship: true,
      },
    });

    if (!fixture || fixture.championshipId !== pool.championshipId) {
      throw new NotFoundException('Jogo não encontrado neste bolão');
    }

    if (!canEditPrediction(fixture)) {
      throw new ConflictException(getPredictionLockMessage(fixture));
    }

    const prediction = await this.prisma.prediction.upsert({
      where: {
        poolId_userId_fixtureId: {
          poolId: dto.poolId,
          userId: user.id,
          fixtureId: dto.fixtureId,
        },
      },
      update: {
        predictedHomeScore: dto.predictedHomeScore,
        predictedAwayScore: dto.predictedAwayScore,
        selectedPlayerId: dto.selectedPlayerId ?? null,
      },
      create: {
        poolId: dto.poolId,
        userId: user.id,
        fixtureId: dto.fixtureId,
        predictedHomeScore: dto.predictedHomeScore,
        predictedAwayScore: dto.predictedAwayScore,
        selectedPlayerId: dto.selectedPlayerId ?? null,
      },
    });

    await this.scoringService.syncPoolScores(dto.poolId);

    const [positions, earnedPointsByKey] = await Promise.all([
      this.rankingService.getPoolMemberPositions([dto.poolId], {
        syncScores: false,
      }),
      this.loadEarnedPointsByKey([dto.poolId]),
    ]);

    return this.toFixtureRow({
      pool,
      fixture,
      member: { id: user.id, name: user.name },
      userId: user.id,
      userRole: user.role,
      prediction,
      poolPosition: positions.get(`${dto.poolId}:${user.id}`) ?? 0,
      earnedPoints:
        earnedPointsByKey.get(`${dto.poolId}:${user.id}:${dto.fixtureId}`) ??
        null,
    });
  }

  private canViewAllPoolPredictions(
    user: AuthUser,
    pool: Pick<Pool, 'ownerId'>,
  ): boolean {
    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    return user.role === 'ADMIN' && pool.ownerId === user.id;
  }

  private async loadActiveMembersByPool(poolIds: number[]) {
    const members = await this.prisma.poolUser.findMany({
      where: {
        poolId: { in: poolIds },
        status: 'ACTIVE',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        user: {
          name: 'asc',
        },
      },
    });

    const membersByPoolId = new Map<number, Array<{ id: number; name: string }>>();

    for (const member of members) {
      if (member.user.role === 'SUPER_ADMIN') {
        continue;
      }

      const current = membersByPoolId.get(member.poolId) ?? [];

      current.push({
        id: member.user.id,
        name: member.user.name,
      });
      membersByPoolId.set(member.poolId, current);
    }

    return membersByPoolId;
  }

  private async loadEarnedPointsByKey(poolIds: number[]) {
    const earnedPointsByKey = new Map<string, number>();

    if (poolIds.length === 0) {
      return earnedPointsByKey;
    }

    const rows = await this.prisma.pointHistory.findMany({
      where: { poolId: { in: poolIds } },
      select: {
        poolId: true,
        userId: true,
        fixtureId: true,
        points: true,
      },
    });

    for (const row of rows) {
      earnedPointsByKey.set(
        `${row.poolId}:${row.userId}:${row.fixtureId}`,
        row.points,
      );
    }

    return earnedPointsByKey;
  }

  private toFixtureRow(input: {
    pool: PoolWithChampionship;
    fixture: {
      id: number;
      round: number | null;
      date: Date;
      status: FixtureStatus;
      homeScore: number | null;
      awayScore: number | null;
      homeTeam: { name: string };
      awayTeam: { name: string };
      championship: { name: string };
    };
    member: { id: number; name: string };
    userId: number;
    userRole: AuthUser['role'];
    prediction: Prediction | null;
    poolPosition: number;
    earnedPoints: number | null;
  }): PredictionFixtureResponse {
    const {
      pool,
      fixture,
      member,
      userId,
      userRole,
      prediction,
      poolPosition,
      earnedPoints,
    } = input;

    return {
      id: fixture.id,
      poolId: pool.id,
      poolName: pool.name,
      poolPosition,
      participantId: member.id,
      participantName: member.name,
      isOwnPrediction:
        userRole !== 'SUPER_ADMIN' && member.id === userId,
      championshipName: fixture.championship.name,
      round: fixture.round ?? 0,
      homeTeam: fixture.homeTeam.name,
      awayTeam: fixture.awayTeam.name,
      date: fixture.date.toISOString(),
      matchStatus: this.toMatchStatus(fixture.status),
      officialHomeScore: fixture.homeScore,
      officialAwayScore: fixture.awayScore,
      earnedPoints:
        fixture.status === 'FINISHED' && prediction ? earnedPoints : null,
      prediction: prediction
        ? {
            fixtureId: fixture.id,
            predictedHomeScore: prediction.predictedHomeScore,
            predictedAwayScore: prediction.predictedAwayScore,
            selectedPlayerId: prediction.selectedPlayerId,
          }
        : null,
    };
  }

  private async findAccessiblePools(
    user: AuthUser,
  ): Promise<PoolWithChampionship[]> {
    if (user.role === 'SUPER_ADMIN') {
      return this.prisma.pool.findMany({
        orderBy: { createdAt: 'desc' },
        include: { championship: true },
      });
    }

    return this.prisma.pool.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          {
            poolUsers: {
              some: {
                userId: user.id,
                status: 'ACTIVE',
              },
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: { championship: true },
    });
  }

  private async findAccessiblePoolById(poolId: number, user: AuthUser) {
    const pools = await this.findAccessiblePools(user);
    const pool = pools.find(item => item.id === poolId);

    if (!pool) {
      throw new NotFoundException('Bolão não encontrado');
    }

    return pool;
  }

  private toMatchStatus(
    status: FixtureStatus,
  ): 'SCHEDULED' | 'LIVE' | 'FINISHED' {
    if (status === 'LIVE') {
      return 'LIVE';
    }

    if (status === 'FINISHED') {
      return 'FINISHED';
    }

    return 'SCHEDULED';
  }
}
