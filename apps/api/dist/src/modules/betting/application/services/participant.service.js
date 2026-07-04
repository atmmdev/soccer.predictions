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
exports.ParticipantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
let ParticipantService = class ParticipantService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listForUser(user) {
        const poolFilter = user.role === 'SUPER_ADMIN'
            ? {}
            : {
                ownerId: user.id,
            };
        const members = await this.prisma.poolUser.findMany({
            where: {
                pool: poolFilter,
                user: {
                    role: { not: 'SUPER_ADMIN' },
                },
            },
            include: {
                pool: {
                    select: {
                        id: true,
                        name: true,
                        inviteCode: true,
                        ownerId: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: [
                { pool: { name: 'asc' } },
                { user: { name: 'asc' } },
            ],
        });
        if (members.length === 0) {
            return [];
        }
        const predictionCounts = await this.loadPredictionCounts(members.map(member => ({
            poolId: member.poolId,
            userId: member.userId,
        })));
        return members.map(member => ({
            id: member.id,
            poolId: member.pool.id,
            poolName: member.pool.name,
            inviteCode: member.pool.inviteCode,
            userId: member.user.id,
            name: member.user.name,
            email: member.user.email,
            isOwner: member.pool.ownerId === member.user.id,
            status: member.status,
            joinedAt: member.joinedAt.toISOString(),
            predictionsCount: predictionCounts.get(`${member.poolId}:${member.userId}`) ?? 0,
        }));
    }
    async loadPredictionCounts(keys) {
        const counts = new Map();
        if (keys.length === 0) {
            return counts;
        }
        const poolIds = [...new Set(keys.map(key => key.poolId))];
        const predictions = await this.prisma.prediction.groupBy({
            by: ['poolId', 'userId'],
            where: {
                poolId: { in: poolIds },
            },
            _count: { _all: true },
        });
        for (const row of predictions) {
            counts.set(`${row.poolId}:${row.userId}`, row._count._all);
        }
        return counts;
    }
};
exports.ParticipantService = ParticipantService;
exports.ParticipantService = ParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ParticipantService);
//# sourceMappingURL=participant.service.js.map