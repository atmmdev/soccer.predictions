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
let PredictionService = class PredictionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listForUser(user) {
        const pools = await this.findAccessiblePools(user);
        if (pools.length === 0) {
            return [];
        }
        const poolIds = pools.map(pool => pool.id);
        const championshipIds = [...new Set(pools.map(pool => pool.championshipId))];
        const fixtures = await this.prisma.fixture.findMany({
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
        });
        const predictions = await this.prisma.prediction.findMany({
            where: { poolId: { in: poolIds } },
        });
        const predictionsByKey = new Map();
        for (const prediction of predictions) {
            predictionsByKey.set(`${prediction.poolId}:${prediction.userId}:${prediction.fixtureId}`, prediction);
        }
        const membersByPoolId = await this.loadActiveMembersByPool(poolIds);
        const rows = [];
        for (const pool of pools) {
            const poolFixtures = fixtures.filter(fixture => fixture.championshipId === pool.championshipId);
            const members = membersByPoolId.get(pool.id) ?? [];
            const viewAll = this.canViewAllPoolPredictions(user, pool);
            if (viewAll) {
                for (const fixture of poolFixtures) {
                    for (const member of members) {
                        rows.push(this.toFixtureRow({
                            pool,
                            fixture,
                            member,
                            userId: user.id,
                            userRole: user.role,
                            prediction: predictionsByKey.get(`${pool.id}:${member.id}:${fixture.id}`) ?? null,
                        }));
                    }
                }
                continue;
            }
            const member = members.find(poolMember => poolMember.id === user.id) ?? {
                id: user.id,
                name: user.name,
            };
            for (const fixture of poolFixtures) {
                rows.push(this.toFixtureRow({
                    pool,
                    fixture,
                    member,
                    userId: user.id,
                    userRole: user.role,
                    prediction: predictionsByKey.get(`${pool.id}:${user.id}:${fixture.id}`) ??
                        null,
                }));
            }
        }
        return rows.sort((left, right) => {
            const dateDiff = new Date(left.date).getTime() - new Date(right.date).getTime();
            if (dateDiff !== 0) {
                return dateDiff;
            }
            if (left.poolName !== right.poolName) {
                return left.poolName.localeCompare(right.poolName);
            }
            return left.participantName.localeCompare(right.participantName);
        });
    }
    async submit(dto, user) {
        (0, pool_participation_js_1.assertCanParticipateInPools)(user);
        const pool = await this.findAccessiblePoolById(dto.poolId, user);
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
        return this.toFixtureRow({
            pool,
            fixture,
            member: { id: user.id, name: user.name },
            userId: user.id,
            userRole: user.role,
            prediction,
        });
    }
    canViewAllPoolPredictions(user, pool) {
        if (user.role === 'SUPER_ADMIN') {
            return true;
        }
        return user.role === 'ADMIN' && pool.ownerId === user.id;
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
            });
            membersByPoolId.set(member.poolId, current);
        }
        return membersByPoolId;
    }
    toFixtureRow(input) {
        const { pool, fixture, member, userId, userRole, prediction } = input;
        return {
            id: fixture.id,
            poolId: pool.id,
            poolName: pool.name,
            poolPosition: 0,
            participantId: member.id,
            participantName: member.name,
            isOwnPrediction: userRole !== 'SUPER_ADMIN' && member.id === userId,
            championshipName: fixture.championship.name,
            round: fixture.round ?? 0,
            homeTeam: fixture.homeTeam.name,
            awayTeam: fixture.awayTeam.name,
            date: fixture.date.toISOString(),
            matchStatus: this.toMatchStatus(fixture.status),
            officialHomeScore: fixture.homeScore,
            officialAwayScore: fixture.awayScore,
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
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], PredictionService);
//# sourceMappingURL=prediction.service.js.map