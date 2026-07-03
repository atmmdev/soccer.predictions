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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const scoring_service_js_1 = require("./scoring.service.js");
let RankingService = class RankingService {
    prisma;
    scoringService;
    constructor(prisma, scoringService) {
        this.prisma = prisma;
        this.scoringService = scoringService;
    }
    async listForUser(user, poolId) {
        const pools = await this.findAccessiblePools(user, poolId);
        if (pools.length === 0) {
            return [];
        }
        await this.scoringService.syncPoolsScores(pools.map(pool => pool.id));
        const rows = [];
        for (const pool of pools) {
            const members = await this.prisma.poolUser.findMany({
                where: {
                    poolId: pool.id,
                    status: 'ACTIVE',
                    user: { role: { not: 'SUPER_ADMIN' } },
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
                    user: { name: 'asc' },
                },
            });
            for (const member of members) {
                const [pointHistory, predictionsCount] = await Promise.all([
                    this.prisma.pointHistory.findMany({
                        where: {
                            poolId: pool.id,
                            userId: member.userId,
                        },
                        select: {
                            points: true,
                            breakdown: true,
                        },
                    }),
                    this.prisma.prediction.count({
                        where: {
                            poolId: pool.id,
                            userId: member.userId,
                        },
                    }),
                ]);
                const aggregated = scoring_service_js_1.ScoringService.aggregateBreakdown(pointHistory);
                rows.push({
                    id: member.userId,
                    poolId: pool.id,
                    poolName: pool.name,
                    championshipName: pool.championship.name,
                    name: member.user.name,
                    points: aggregated.points,
                    predictionsCount,
                    scoringAchievements: aggregated.achievements,
                    isCurrentUser: member.userId === user.id,
                });
            }
        }
        return rows.sort((left, right) => {
            if (left.poolName !== right.poolName) {
                return left.poolName.localeCompare(right.poolName);
            }
            if (right.points !== left.points) {
                return right.points - left.points;
            }
            return left.name.localeCompare(right.name);
        });
    }
    async getPoolMemberPositions(poolIds, options) {
        const positions = new Map();
        if (poolIds.length === 0) {
            return positions;
        }
        if (options?.syncScores !== false) {
            await this.scoringService.syncPoolsScores(poolIds);
        }
        for (const poolId of poolIds) {
            const members = await this.prisma.poolUser.findMany({
                where: {
                    poolId,
                    status: 'ACTIVE',
                    user: { role: { not: 'SUPER_ADMIN' } },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            const ranked = await Promise.all(members.map(async (member) => {
                const pointHistory = await this.prisma.pointHistory.findMany({
                    where: {
                        poolId,
                        userId: member.userId,
                    },
                    select: {
                        points: true,
                        breakdown: true,
                    },
                });
                const aggregated = scoring_service_js_1.ScoringService.aggregateBreakdown(pointHistory);
                return {
                    userId: member.userId,
                    name: member.user.name,
                    points: aggregated.points,
                };
            }));
            ranked.sort((left, right) => {
                if (right.points !== left.points) {
                    return right.points - left.points;
                }
                return left.name.localeCompare(right.name);
            });
            ranked.forEach((entry, index) => {
                positions.set(`${poolId}:${entry.userId}`, index + 1);
            });
        }
        return positions;
    }
    async findAccessiblePools(user, poolId) {
        if (poolId !== undefined) {
            const pool = await this.findAccessiblePoolById(poolId, user);
            return [pool];
        }
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
        if (user.role === 'SUPER_ADMIN') {
            const pool = await this.prisma.pool.findUnique({
                where: { id: poolId },
                include: { championship: true },
            });
            if (!pool) {
                throw new common_1.NotFoundException('Bolão não encontrado');
            }
            return pool;
        }
        const pool = await this.prisma.pool.findFirst({
            where: {
                id: poolId,
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
            include: { championship: true },
        });
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        return pool;
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        scoring_service_js_1.ScoringService])
], RankingService);
//# sourceMappingURL=ranking.service.js.map