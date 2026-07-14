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
const pool_participation_js_1 = require("../../../../shared/auth/pool-participation.js");
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
                            predictions: true,
                        },
                    },
                },
            });
            return pools.map(pool => this.toPoolListItem(pool, user.id, user.role));
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
                        predictions: true,
                    },
                },
            },
        });
        return pools.map(pool => this.toPoolListItem(pool, user.id, user.role));
    }
    async discoverForUser(user) {
        (0, pool_participation_js_1.assertCanParticipateInPools)(user);
        const pools = await this.prisma.pool.findMany({
            where: {
                status: 'ACTIVE',
                ownerId: { not: user.id },
                NOT: {
                    poolUsers: {
                        some: {
                            userId: user.id,
                            status: 'ACTIVE',
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            include: {
                championship: true,
                owner: {
                    select: { id: true, name: true },
                },
                poolUsers: {
                    where: { userId: user.id },
                    select: { status: true },
                    take: 1,
                },
                _count: {
                    select: {
                        poolUsers: {
                            where: { status: 'ACTIVE' },
                        },
                    },
                },
            },
        });
        return pools.map(pool => this.toDiscoverablePoolItem(pool));
    }
    async requestAccess(poolId, user) {
        (0, pool_participation_js_1.assertCanParticipateInPools)(user);
        const pool = await this.prisma.pool.findUnique({
            where: { id: poolId },
            select: { id: true, ownerId: true, status: true },
        });
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        if (pool.status !== 'ACTIVE') {
            throw new common_1.ConflictException('Este bolão não aceita novos participantes');
        }
        if (pool.ownerId === user.id) {
            throw new common_1.ConflictException('Você já é o dono deste bolão');
        }
        const existing = await this.prisma.poolUser.findUnique({
            where: {
                poolId_userId: {
                    poolId: pool.id,
                    userId: user.id,
                },
            },
        });
        if (existing?.status === 'ACTIVE') {
            throw new common_1.ConflictException('Você já participa deste bolão');
        }
        if (existing?.status === 'PENDING') {
            return this.loadDiscoverablePoolItem(pool.id, user.id);
        }
        if (existing) {
            await this.prisma.poolUser.update({
                where: { id: existing.id },
                data: { status: 'PENDING' },
            });
        }
        else {
            await this.prisma.poolUser.create({
                data: {
                    poolId: pool.id,
                    userId: user.id,
                    status: 'PENDING',
                },
            });
        }
        return this.loadDiscoverablePoolItem(pool.id, user.id);
    }
    async approveMember(poolId, memberUserId, user) {
        await this.assertPoolOwner(poolId, user);
        return this.updateMemberStatus(poolId, memberUserId, 'ACTIVE', 'PENDING');
    }
    async rejectMember(poolId, memberUserId, user) {
        await this.assertPoolOwner(poolId, user);
        return this.updateMemberStatus(poolId, memberUserId, 'INACTIVE', 'PENDING');
    }
    async getByIdForUser(poolId, user) {
        await this.findAccessiblePool(poolId, user);
        return this.loadPoolListItem(poolId, user.id, user.role);
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
        const owner = await this.resolvePoolOwner(user, dto.delegateUserId);
        const result = await this.prisma.$transaction(async (tx) => {
            const pool = await tx.pool.create({
                data: {
                    ownerId: owner.id,
                    championshipId: dto.championshipId,
                    name: dto.name,
                    inviteCode,
                    scoring: dto.scoring,
                    ...(owner.addAsParticipant
                        ? {
                            poolUsers: {
                                create: {
                                    userId: owner.id,
                                    status: 'ACTIVE',
                                },
                            },
                        }
                        : {}),
                },
            });
            let nextUser = user;
            if (owner.promoteToAdmin) {
                await tx.user.update({
                    where: { id: owner.id },
                    data: { role: 'ADMIN' },
                });
            }
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
            pool: await this.loadPoolListItem(result.pool.id, result.user.id, result.user.role),
            user: result.user,
        };
    }
    async join(dto, user) {
        (0, pool_participation_js_1.assertCanParticipateInPools)(user);
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
            return this.loadPoolListItem(pool.id, user.id, user.role);
        }
        if (existingMembership) {
            await this.prisma.poolUser.update({
                where: { id: existingMembership.id },
                data: { status: 'ACTIVE' },
            });
            return this.loadPoolListItem(pool.id, user.id, user.role);
        }
        await this.prisma.poolUser.create({
            data: {
                poolId: pool.id,
                userId: user.id,
                status: 'ACTIVE',
            },
        });
        return this.loadPoolListItem(pool.id, user.id, user.role);
    }
    async updateStatus(poolId, dto, user) {
        const pool = await this.findAccessiblePool(poolId, user);
        if (pool.status === 'CLOSED' && dto.status !== 'CLOSED') {
            throw new common_1.ConflictException('Bolão encerrado não pode ser reativado');
        }
        if (pool.status === dto.status) {
            return this.loadPoolListItem(poolId, user.id, user.role);
        }
        await this.prisma.pool.update({
            where: { id: poolId },
            data: { status: dto.status },
        });
        return this.loadPoolListItem(poolId, user.id, user.role);
    }
    async update(poolId, dto, user) {
        const pool = await this.findAccessiblePool(poolId, user);
        if (pool.status === 'CLOSED') {
            throw new common_1.ConflictException('Bolão encerrado não pode ser editado');
        }
        await this.prisma.pool.update({
            where: { id: poolId },
            data: {
                name: dto.name.trim(),
                scoring: dto.scoring,
            },
        });
        return this.loadPoolListItem(poolId, user.id, user.role);
    }
    async resolvePoolOwner(user, delegateUserId) {
        if (user.role !== 'SUPER_ADMIN') {
            return {
                id: user.id,
                addAsParticipant: true,
                promoteToAdmin: false,
            };
        }
        if (!delegateUserId) {
            return {
                id: user.id,
                addAsParticipant: false,
                promoteToAdmin: false,
            };
        }
        const delegate = await this.prisma.user.findUnique({
            where: { id: delegateUserId },
            select: { id: true, role: true },
        });
        if (!delegate) {
            throw new common_1.NotFoundException('Administrador delegado não encontrado');
        }
        if (delegate.role === 'SUPER_ADMIN') {
            throw new common_1.ConflictException('Super administradores não podem ser delegados como donos de bolão');
        }
        return {
            id: delegate.id,
            addAsParticipant: true,
            promoteToAdmin: delegate.role === 'PARTICIPANT',
        };
    }
    async loadPoolListItem(poolId, userId, userRole) {
        const pool = await this.prisma.pool.findUnique({
            where: { id: poolId },
            include: {
                championship: true,
                _count: {
                    select: {
                        poolUsers: {
                            where: { status: 'ACTIVE' },
                        },
                        predictions: true,
                    },
                },
            },
        });
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        return this.toPoolListItem(pool, userId, userRole);
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
    async updateMemberStatus(poolId, memberUserId, nextStatus, expectedStatus) {
        const membership = await this.prisma.poolUser.findUnique({
            where: {
                poolId_userId: {
                    poolId,
                    userId: memberUserId,
                },
            },
        });
        if (!membership) {
            throw new common_1.NotFoundException('Pedido de acesso não encontrado');
        }
        if (membership.status !== expectedStatus) {
            throw new common_1.ConflictException(nextStatus === 'ACTIVE'
                ? 'Este pedido não está pendente de aprovação'
                : 'Este pedido não está pendente de recusa');
        }
        const updated = await this.prisma.poolUser.update({
            where: { id: membership.id },
            data: { status: nextStatus },
        });
        return {
            userId: updated.userId,
            status: updated.status,
        };
    }
    async assertPoolOwner(poolId, user) {
        const pool = await this.prisma.pool.findUnique({ where: { id: poolId } });
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        if (user.role !== 'SUPER_ADMIN' && pool.ownerId !== user.id) {
            throw new common_1.ForbiddenException('Somente o proprietário pode executar esta ação');
        }
        return pool;
    }
    async loadDiscoverablePoolItem(poolId, userId) {
        const pool = await this.prisma.pool.findUnique({
            where: { id: poolId },
            include: {
                championship: true,
                owner: {
                    select: { id: true, name: true },
                },
                poolUsers: {
                    where: { userId },
                    select: { status: true },
                    take: 1,
                },
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
        return this.toDiscoverablePoolItem(pool);
    }
    toDiscoverablePoolItem(pool) {
        const membership = pool.poolUsers[0]?.status;
        const membershipStatus = membership === 'PENDING' || membership === 'INACTIVE'
            ? membership
            : null;
        return {
            id: pool.id,
            name: pool.name,
            championshipName: pool.championship.name,
            championshipType: pool.championship.type,
            season: pool.championship.season,
            participantsCount: pool._count.poolUsers,
            ownerId: pool.owner.id,
            ownerName: pool.owner.name,
            status: pool.status,
            membershipStatus,
        };
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
    toPoolListItem(pool, userId, userRole) {
        return {
            id: pool.id,
            name: pool.name,
            championshipId: pool.championshipId,
            championshipName: pool.championship.name,
            championshipType: pool.championship.type,
            season: pool.championship.season,
            participantsCount: pool._count.poolUsers,
            predictionsCount: pool._count.predictions,
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