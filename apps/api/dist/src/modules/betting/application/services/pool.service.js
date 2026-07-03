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
exports.PoolService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const generate_invite_code_js_1 = require("../utils/generate-invite-code.js");
let PoolService = class PoolService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listForUser(user) {
        if (user.role === 'SUPER_ADMIN') {
            const pools = await this.prisma.pool.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    championship: true,
                    _count: {
                        select: {
                            poolUsers: {
                                where: { status: 'ACTIVE' },
                            },
                        },
                    },
                },
            });
            return pools.map(pool => this.toPoolListItem(pool, user.id));
        }
        const pools = await this.prisma.pool.findMany({
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
            include: {
                championship: true,
                _count: {
                    select: {
                        poolUsers: {
                            where: { status: 'ACTIVE' },
                        },
                    },
                },
            },
        });
        return pools.map(pool => this.toPoolListItem(pool, user.id));
    }
    async getByIdForUser(poolId, user) {
        await this.findAccessiblePool(poolId, user);
        return this.loadPoolListItem(poolId, user.id);
    }
    async create(dto, user) {
        const championship = await this.prisma.championship.findUnique({
            where: { id: dto.championshipId },
        });
        if (!championship) {
            throw new common_1.NotFoundException('Campeonato não encontrado');
        }
        if (!championship.allowNewPools || championship.status !== 'ACTIVE') {
            throw new common_1.ConflictException('Este campeonato não permite novos bolões no momento');
        }
        const inviteCode = await this.createUniqueInviteCode();
        const result = await this.prisma.$transaction(async (tx) => {
            const pool = await tx.pool.create({
                data: {
                    ownerId: user.id,
                    championshipId: dto.championshipId,
                    name: dto.name,
                    inviteCode,
                    scoring: dto.scoring,
                    poolUsers: {
                        create: {
                            userId: user.id,
                            status: 'ACTIVE',
                        },
                    },
                },
            });
            let nextUser = user;
            if (user.role === 'PARTICIPANT') {
                const updatedUser = await tx.user.update({
                    where: { id: user.id },
                    data: { role: 'ADMIN' },
                });
                nextUser = {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    role: updatedUser.role,
                };
            }
            return { pool, user: nextUser };
        });
        return {
            pool: await this.loadPoolListItem(result.pool.id, result.user.id),
            user: result.user,
        };
    }
    async join(dto, user) {
        const pool = await this.prisma.pool.findUnique({
            where: { inviteCode: dto.inviteCode.toUpperCase() },
        });
        if (!pool) {
            throw new common_1.NotFoundException('Código de convite inválido');
        }
        if (pool.status !== 'ACTIVE') {
            throw new common_1.ConflictException('Este bolão não aceita novos participantes');
        }
        const existingMembership = await this.prisma.poolUser.findUnique({
            where: {
                poolId_userId: {
                    poolId: pool.id,
                    userId: user.id,
                },
            },
        });
        if (existingMembership?.status === 'ACTIVE') {
            return this.loadPoolListItem(pool.id, user.id);
        }
        if (existingMembership) {
            await this.prisma.poolUser.update({
                where: { id: existingMembership.id },
                data: { status: 'ACTIVE' },
            });
            return this.loadPoolListItem(pool.id, user.id);
        }
        await this.prisma.poolUser.create({
            data: {
                poolId: pool.id,
                userId: user.id,
                status: 'ACTIVE',
            },
        });
        return this.loadPoolListItem(pool.id, user.id);
    }
    async loadPoolListItem(poolId, userId) {
        const pool = await this.prisma.pool.findUnique({
            where: { id: poolId },
            include: {
                championship: true,
                _count: {
                    select: {
                        poolUsers: {
                            where: { status: 'ACTIVE' },
                        },
                    },
                },
            },
        });
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        return this.toPoolListItem(pool, userId);
    }
    async findAccessiblePool(poolId, user) {
        if (user.role === 'SUPER_ADMIN') {
            const pool = await this.prisma.pool.findUnique({ where: { id: poolId } });
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
        });
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        return pool;
    }
    async createUniqueInviteCode() {
        for (let attempt = 0; attempt < 5; attempt += 1) {
            const inviteCode = (0, generate_invite_code_js_1.generateInviteCode)();
            const existing = await this.prisma.pool.findUnique({
                where: { inviteCode },
                select: { id: true },
            });
            if (!existing) {
                return inviteCode;
            }
        }
        throw new common_1.ConflictException('Não foi possível gerar código de convite');
    }
    toPoolListItem(pool, userId) {
        return {
            id: pool.id,
            name: pool.name,
            championshipId: pool.championshipId,
            championshipName: pool.championship.name,
            championshipType: pool.championship.type,
            season: pool.championship.season,
            participantsCount: pool._count.poolUsers,
            inviteCode: pool.inviteCode,
            status: pool.status,
            scoring: pool.scoring,
            ownerId: pool.ownerId,
            isOwner: pool.ownerId === userId,
            createdAt: pool.createdAt,
            updatedAt: pool.updatedAt,
        };
    }
};
exports.PoolService = PoolService;
exports.PoolService = PoolService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], PoolService);
//# sourceMappingURL=pool.service.js.map