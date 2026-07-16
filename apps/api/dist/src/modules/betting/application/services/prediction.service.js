"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const prediction_window_js_1 = require("../utils/prediction-window.js");
const pool_participation_js_1 = require("../../../../shared/auth/pool-participation.js");
const ranking_service_js_1 = require("./ranking.service.js");
const scoring_service_js_1 = require("./scoring.service.js");
let PredictionService = class PredictionService {
    prisma;
    rankingService;
    scoringService;
    constructor(prisma, rankingService, scoringService) {
        this.prisma = prisma;
        this.rankingService = rankingService;
        this.scoringService = scoringService;
    }
    async listForUser(user) {
        const pools = await this.findAccessiblePools(user);
        if (pools.length === 0) {
            return [];
        }
        const poolIds = pools.map(pool => pool.id);
        const championshipIds = [...new Set(pools.map(pool => pool.championshipId))];
        await this.scoringService.syncPoolsScores(poolIds);
        const listAllMembers = user.role === 'SUPER_ADMIN';
        const [fixtures, predictions, membersByPoolId, positions, earnedPointsByKey] = await Promise.all([
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
                where: {
                    poolId: { in: poolIds },
                    ...(listAllMembers ? {} : { userId: user.id }),
                },
            }),
            this.loadActiveMembersByPool(poolIds),
            this.rankingService.getPoolMemberPositions(poolIds, {
                syncScores: false,
            }),
            this.loadEarnedPointsByKey(poolIds, listAllMembers ? undefined : user.id),
        ]);
        const predictionsByKey = new Map();
        for (const prediction of predictions) {
            predictionsByKey.set(`${prediction.poolId}:${prediction.userId}:${prediction.fixtureId}`, prediction);
        }
        const rows = [];
        for (const pool of pools) {
            const poolFixtures = fixtures.filter(fixture => fixture.championshipId === pool.championshipId);
            const members = membersByPoolId.get(pool.id) ?? [];
            const membersToList = listAllMembers
                ? members
                : members.filter(member => member.id === user.id);
            if (membersToList.length === 0) {
                continue;
            }
            for (const member of membersToList) {
                for (const fixture of poolFixtures) {
                    const prediction = predictionsByKey.get(`${pool.id}:${member.id}:${fixture.id}`) ?? null;
                    rows.push(this.toFixtureRow({
                        pool,
                        fixture,
                        member,
                        userId: user.id,
                        prediction,
                        poolPosition: positions.get(`${pool.id}:${member.id}`) ?? 0,
                        earnedPoints: earnedPointsByKey.get(`${pool.id}:${member.id}:${fixture.id}`) ?? null,
                    }));
                }
            }
        }
        return rows.sort((left, right) => {
            const dateDiff = new Date(left.date).getTime() - new Date(right.date).getTime();
            if (dateDiff !== 0) {
                return dateDiff;
            }
            const poolDiff = left.poolName.localeCompare(right.poolName);
            if (poolDiff !== 0) {
                return poolDiff;
            }
            return left.participantName.localeCompare(right.participantName);
        });
    }
    async listByPoolAndFixture(poolId, fixtureId, user) {
        const pool = await this.findAccessiblePoolById(poolId, user);
        const fixture = await this.prisma.fixture.findUnique({
            where: { id: fixtureId },
            include: {
                homeTeam: true,
                awayTeam: true,
                championship: true,
            },
        });
        if (!fixture || fixture.championshipId !== pool.championshipId) {
            throw new common_1.NotFoundException('Jogo não encontrado neste bolão');
        }
        await this.scoringService.syncPoolScores(poolId);
        const [predictions, membersByPoolId, positions, earnedPointsByKey] = await Promise.all([
            this.prisma.prediction.findMany({
                where: { poolId, fixtureId },
            }),
            this.loadActiveMembersByPool([poolId]),
            this.rankingService.getPoolMemberPositions([poolId], {
                syncScores: false,
            }),
            this.loadEarnedPointsByKey([poolId]),
        ]);
        const predictionsByUserId = new Map(predictions.map(prediction => [prediction.userId, prediction]));
        const members = membersByPoolId.get(poolId) ?? [];
        return members
            .map(member => {
            const prediction = predictionsByUserId.get(member.id) ?? null;
            return this.toFixtureRow({
                pool,
                fixture,
                member,
                userId: user.id,
                prediction,
                poolPosition: positions.get(`${poolId}:${member.id}`) ?? 0,
                earnedPoints: earnedPointsByKey.get(`${poolId}:${member.id}:${fixtureId}`) ?? null,
            });
        })
            .sort((left, right) => left.participantName.localeCompare(right.participantName));
    }
    async submit(dto, user) {
        (0, pool_participation_js_1.assertCanParticipateInPools)(user);
        const pool = await this.findAccessiblePoolById(dto.poolId, user);
        if (pool.status !== 'ACTIVE') {
            throw new common_1.ConflictException(pool.status === 'CLOSED'
                ? 'Este bolão está encerrado e não aceita palpites'
                : 'Este bolão está inativo e não aceita palpites');
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
            throw new common_1.NotFoundException('Jogo não encontrado neste bolão');
        }
        if (!(0, prediction_window_js_1.canEditPrediction)(fixture)) {
            throw new common_1.ConflictException((0, prediction_window_js_1.getPredictionLockMessage)(fixture));
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
                selectedPlayerId: null,
            },
            create: {
                poolId: dto.poolId,
                userId: user.id,
                fixtureId: dto.fixtureId,
                predictedHomeScore: dto.predictedHomeScore,
                predictedAwayScore: dto.predictedAwayScore,
                selectedPlayerId: null,
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
            member: {
                id: user.id,
                name: user.name,
                avatarDataUrl: user.avatarDataUrl,
            },
            userId: user.id,
            prediction,
            poolPosition: positions.get(`${dto.poolId}:${user.id}`) ?? 0,
            earnedPoints: earnedPointsByKey.get(`${dto.poolId}:${user.id}:${dto.fixtureId}`) ??
                null,
        });
    }
    async loadActiveMembersByPool(poolIds) {
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
                        avatarDataUrl: true,
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
        const membersByPoolId = new Map();
        for (const member of members) {
            if (member.user.role === 'SUPER_ADMIN') {
                continue;
            }
            const current = membersByPoolId.get(member.poolId) ?? [];
            current.push({
                id: member.user.id,
                name: member.user.name,
                avatarDataUrl: member.user.avatarDataUrl,
            });
            membersByPoolId.set(member.poolId, current);
        }
        return membersByPoolId;
    }
    async loadEarnedPointsByKey(poolIds, userId) {
        const earnedPointsByKey = new Map();
        if (poolIds.length === 0) {
            return earnedPointsByKey;
        }
        const rows = await this.prisma.pointHistory.findMany({
            where: {
                poolId: { in: poolIds },
                ...(userId !== undefined ? { userId } : {}),
            },
            select: {
                poolId: true,
                userId: true,
                fixtureId: true,
                points: true,
            },
        });
        for (const row of rows) {
            earnedPointsByKey.set(`${row.poolId}:${row.userId}:${row.fixtureId}`, row.points);
        }
        return earnedPointsByKey;
    }
    toFixtureRow(input) {
        const { pool, fixture, member, userId, prediction, poolPosition, earnedPoints, } = input;
        return {
            id: fixture.id,
            poolId: pool.id,
            poolName: pool.name,
            poolPosition,
            participantId: member.id,
            participantName: member.name,
            participantAvatarDataUrl: member.avatarDataUrl,
            isOwnPrediction: member.id === userId,
            championshipName: fixture.championship.name,
            round: fixture.round,
            phase: fixture.phase,
            homeTeam: fixture.homeTeam.name,
            awayTeam: fixture.awayTeam.name,
            homeTeamLogo: fixture.homeTeam.logo ?? '',
            awayTeamLogo: fixture.awayTeam.logo ?? '',
            date: fixture.date.toISOString(),
            matchStatus: this.toMatchStatus(fixture.status),
            officialHomeScore: fixture.homeScore,
            officialAwayScore: fixture.awayScore,
            earnedPoints: prediction && fixture.status === 'FINISHED' ? earnedPoints : null,
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
    async findAccessiblePools(user) {
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
    async findAccessiblePoolById(poolId, user) {
        const pools = await this.findAccessiblePools(user);
        const pool = pools.find(item => item.id === poolId);
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        return pool;
    }
    toMatchStatus(status) {
        if (status === 'LIVE') {
            return 'LIVE';
        }
        if (status === 'FINISHED') {
            return 'FINISHED';
        }
        return 'SCHEDULED';
    }
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        ranking_service_js_1.RankingService,
        scoring_service_js_1.ScoringService])
], PredictionService);
//# sourceMappingURL=prediction.service.js.map