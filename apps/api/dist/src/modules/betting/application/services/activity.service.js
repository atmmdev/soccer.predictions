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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const PER_SOURCE_LIMIT = 50;
let ActivityService = class ActivityService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listForUser(user, limitQuery) {
        const limit = this.normalizeLimit(limitQuery);
        const pools = await this.findAccessiblePools(user);
        if (pools.length === 0) {
            return [];
        }
        const poolIds = pools.map(pool => pool.id);
        const championshipIds = [
            ...new Set(pools.map(pool => pool.championshipId)),
        ];
        const [participants, predictions, createdPools, finishedFixtures] = await Promise.all([
            this.prisma.poolUser.findMany({
                where: {
                    poolId: { in: poolIds },
                    status: 'ACTIVE',
                },
                orderBy: { joinedAt: 'desc' },
                take: PER_SOURCE_LIMIT,
                include: {
                    user: { select: { id: true, name: true } },
                    pool: { select: { id: true, name: true } },
                },
            }),
            this.prisma.prediction.findMany({
                where: { poolId: { in: poolIds } },
                orderBy: { createdAt: 'desc' },
                take: PER_SOURCE_LIMIT,
                include: {
                    user: { select: { id: true, name: true } },
                    fixture: {
                        include: {
                            homeTeam: { select: { name: true } },
                            awayTeam: { select: { name: true } },
                        },
                    },
                },
            }),
            this.prisma.pool.findMany({
                where: { id: { in: poolIds } },
                orderBy: { createdAt: 'desc' },
                take: PER_SOURCE_LIMIT,
                include: {
                    owner: { select: { id: true, name: true } },
                },
            }),
            this.prisma.fixture.findMany({
                where: {
                    championshipId: { in: championshipIds },
                    status: 'FINISHED',
                },
                orderBy: { updatedAt: 'desc' },
                take: PER_SOURCE_LIMIT,
                include: {
                    homeTeam: { select: { name: true } },
                    awayTeam: { select: { name: true } },
                    championship: { select: { name: true } },
                },
            }),
        ]);
        const items = [
            ...participants.map(row => ({
                id: `participant:${row.id}`,
                type: 'participant',
                title: 'Novo participante cadastrado',
                description: `${row.user.name} entrou no bolão ${row.pool.name}`,
                occurredAt: row.joinedAt.toISOString(),
            })),
            ...predictions.map(row => ({
                id: `prediction:${row.id}`,
                type: 'prediction',
                title: 'Novo palpite registrado',
                description: `${row.user.name} registrou palpite no jogo ${row.fixture.homeTeam.name} x ${row.fixture.awayTeam.name}`,
                occurredAt: row.createdAt.toISOString(),
            })),
            ...createdPools.map(row => ({
                id: `pool:${row.id}`,
                type: 'pool',
                title: 'Bolão criado',
                description: `${row.name} foi criado por ${row.owner.name}`,
                occurredAt: row.createdAt.toISOString(),
            })),
            ...finishedFixtures.map(row => {
                const homeScore = row.homeScore ?? 0;
                const awayScore = row.awayScore ?? 0;
                return {
                    id: `result:${row.id}`,
                    type: 'result',
                    title: 'Resultado finalizado',
                    description: `${row.homeTeam.name} ${homeScore} x ${awayScore} ${row.awayTeam.name} - ${row.championship.name}`,
                    occurredAt: row.updatedAt.toISOString(),
                };
            }),
        ];
        return items
            .sort((left, right) => new Date(right.occurredAt).getTime() -
            new Date(left.occurredAt).getTime())
            .slice(0, limit);
    }
    normalizeLimit(limitQuery) {
        if (limitQuery === undefined || !Number.isFinite(limitQuery)) {
            return DEFAULT_LIMIT;
        }
        return Math.min(MAX_LIMIT, Math.max(1, Math.trunc(limitQuery)));
    }
    async findAccessiblePools(user) {
        if (user.role === 'SUPER_ADMIN') {
            return this.prisma.pool.findMany({
                select: { id: true, championshipId: true },
                orderBy: { createdAt: 'desc' },
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
            select: { id: true, championshipId: true },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ActivityService);
//# sourceMappingURL=activity.service.js.map