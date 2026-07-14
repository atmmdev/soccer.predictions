import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type {
  ChampionshipType,
  Pool,
  PoolUserStatus,
  Prisma,
} from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import type { CreatePoolDto } from '../dtos/create-pool.dto.js';
import type { JoinPoolDto } from '../dtos/join-pool.dto.js';
import type { UpdatePoolStatusDto } from '../dtos/update-pool-status.dto.js';
import { generateInviteCode } from '../utils/generate-invite-code.js';
import { assertCanParticipateInPools } from '../../../../shared/auth/pool-participation.js';

export interface PoolListItem {
  id: number;
  name: string;
  championshipId: number;
  championshipName: string;
  championshipType: ChampionshipType;
  season: number;
  participantsCount: number;
  predictionsCount: number;
  inviteCode: string;
  status: Pool['status'];
  scoring: Prisma.JsonValue;
  ownerId: number;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DiscoverMembershipStatus = 'PENDING' | 'INACTIVE' | null;

export interface DiscoverablePoolItem {
  id: number;
  name: string;
  championshipName: string;
  championshipType: ChampionshipType;
  season: number;
  participantsCount: number;
  ownerId: number;
  ownerName: string;
  status: Pool['status'];
  membershipStatus: DiscoverMembershipStatus;
}

export interface CreatePoolResult {
  pool: PoolListItem;
  user: AuthUser;
}

@Injectable()
export class PoolService {
  constructor(private readonly prisma: PrismaService) {}

  async listForUser(user: AuthUser): Promise<PoolListItem[]> {
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

  async discoverForUser(user: AuthUser): Promise<DiscoverablePoolItem[]> {
    assertCanParticipateInPools(user);

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

  async requestAccess(
    poolId: number,
    user: AuthUser,
  ): Promise<DiscoverablePoolItem> {
    assertCanParticipateInPools(user);

    const pool = await this.prisma.pool.findUnique({
      where: { id: poolId },
      select: { id: true, ownerId: true, status: true },
    });

    if (!pool) {
      throw new NotFoundException('Bolão não encontrado');
    }

    if (pool.status !== 'ACTIVE') {
      throw new ConflictException('Este bolão não aceita novos participantes');
    }

    if (pool.ownerId === user.id) {
      throw new ConflictException('Você já é o dono deste bolão');
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
      throw new ConflictException('Você já participa deste bolão');
    }

    if (existing?.status === 'PENDING') {
      return this.loadDiscoverablePoolItem(pool.id, user.id);
    }

    if (existing) {
      await this.prisma.poolUser.update({
        where: { id: existing.id },
        data: { status: 'PENDING' },
      });
    } else {
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

  async approveMember(
    poolId: number,
    memberUserId: number,
    user: AuthUser,
  ): Promise<{ userId: number; status: PoolUserStatus }> {
    await this.assertPoolOwner(poolId, user);
    return this.updateMemberStatus(poolId, memberUserId, 'ACTIVE', 'PENDING');
  }

  async rejectMember(
    poolId: number,
    memberUserId: number,
    user: AuthUser,
  ): Promise<{ userId: number; status: PoolUserStatus }> {
    await this.assertPoolOwner(poolId, user);
    return this.updateMemberStatus(poolId, memberUserId, 'INACTIVE', 'PENDING');
  }

  async getByIdForUser(poolId: number, user: AuthUser): Promise<PoolListItem> {
    await this.findAccessiblePool(poolId, user);

    return this.loadPoolListItem(poolId, user.id, user.role);
  }

  async create(dto: CreatePoolDto, user: AuthUser): Promise<CreatePoolResult> {
    const championship = await this.prisma.championship.findUnique({
      where: { id: dto.championshipId },
    });

    if (!championship) {
      throw new NotFoundException('Campeonato não encontrado');
    }

    if (!championship.allowNewPools || championship.status !== 'ACTIVE') {
      throw new ConflictException(
        'Este campeonato não permite novos bolões no momento',
      );
    }

    const inviteCode = await this.createUniqueInviteCode();
    const owner = await this.resolvePoolOwner(user, dto.delegateUserId);

    const result = await this.prisma.$transaction(async tx => {
      const pool = await tx.pool.create({
        data: {
          ownerId: owner.id,
          championshipId: dto.championshipId,
          name: dto.name,
          inviteCode,
          scoring: dto.scoring as Prisma.InputJsonValue,
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

  async join(dto: JoinPoolDto, user: AuthUser): Promise<PoolListItem> {
    assertCanParticipateInPools(user);

    const pool = await this.prisma.pool.findUnique({
      where: { inviteCode: dto.inviteCode.toUpperCase() },
    });

    if (!pool) {
      throw new NotFoundException('Código de convite inválido');
    }

    if (pool.status !== 'ACTIVE') {
      throw new ConflictException('Este bolão não aceita novos participantes');
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

  async updateStatus(
    poolId: number,
    dto: UpdatePoolStatusDto,
    user: AuthUser,
  ): Promise<PoolListItem> {
    const pool = await this.findAccessiblePool(poolId, user);

    if (pool.status === 'CLOSED' && dto.status !== 'CLOSED') {
      throw new ConflictException('Bolão encerrado não pode ser reativado');
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

  private async resolvePoolOwner(
    user: AuthUser,
    delegateUserId?: number,
  ): Promise<{
    id: number;
    addAsParticipant: boolean;
    promoteToAdmin: boolean;
  }> {
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
      throw new NotFoundException('Administrador delegado não encontrado');
    }

    if (delegate.role === 'SUPER_ADMIN') {
      throw new ConflictException(
        'Super administradores não podem ser delegados como donos de bolão',
      );
    }

    return {
      id: delegate.id,
      addAsParticipant: true,
      promoteToAdmin: delegate.role === 'PARTICIPANT',
    };
  }

  private async loadPoolListItem(
    poolId: number,
    userId: number,
    userRole?: AuthUser['role'],
  ): Promise<PoolListItem> {
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
      throw new NotFoundException('Bolão não encontrado');
    }

    return this.toPoolListItem(pool, userId, userRole);
  }

  private async findAccessiblePool(poolId: number, user: AuthUser): Promise<Pool> {
    if (user.role === 'SUPER_ADMIN') {
      const pool = await this.prisma.pool.findUnique({ where: { id: poolId } });

      if (!pool) {
        throw new NotFoundException('Bolão não encontrado');
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
      throw new NotFoundException('Bolão não encontrado');
    }

    return pool;
  }

  private async updateMemberStatus(
    poolId: number,
    memberUserId: number,
    nextStatus: PoolUserStatus,
    expectedStatus: PoolUserStatus,
  ): Promise<{ userId: number; status: PoolUserStatus }> {
    const membership = await this.prisma.poolUser.findUnique({
      where: {
        poolId_userId: {
          poolId,
          userId: memberUserId,
        },
      },
    });

    if (!membership) {
      throw new NotFoundException('Pedido de acesso não encontrado');
    }

    if (membership.status !== expectedStatus) {
      throw new ConflictException(
        nextStatus === 'ACTIVE'
          ? 'Este pedido não está pendente de aprovação'
          : 'Este pedido não está pendente de recusa',
      );
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

  private async assertPoolOwner(poolId: number, user: AuthUser): Promise<Pool> {
    const pool = await this.prisma.pool.findUnique({ where: { id: poolId } });

    if (!pool) {
      throw new NotFoundException('Bolão não encontrado');
    }

    if (user.role !== 'SUPER_ADMIN' && pool.ownerId !== user.id) {
      throw new ForbiddenException(
        'Somente o proprietário pode executar esta ação',
      );
    }

    return pool;
  }

  private async loadDiscoverablePoolItem(
    poolId: number,
    userId: number,
  ): Promise<DiscoverablePoolItem> {
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
      throw new NotFoundException('Bolão não encontrado');
    }

    return this.toDiscoverablePoolItem(pool);
  }

  private toDiscoverablePoolItem(
    pool: Pool & {
      championship: {
        name: string;
        type: ChampionshipType;
        season: number;
      };
      owner: { id: number; name: string };
      poolUsers: Array<{ status: PoolUserStatus }>;
      _count: { poolUsers: number };
    },
  ): DiscoverablePoolItem {
    const membership = pool.poolUsers[0]?.status;
    const membershipStatus: DiscoverMembershipStatus =
      membership === 'PENDING' || membership === 'INACTIVE'
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

  private async createUniqueInviteCode(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const inviteCode = generateInviteCode();

      const existing = await this.prisma.pool.findUnique({
        where: { inviteCode },
        select: { id: true },
      });

      if (!existing) {
        return inviteCode;
      }
    }

    throw new ConflictException('Não foi possível gerar código de convite');
  }

  private toPoolListItem(
    pool: Pool & {
      championship: {
        name: string;
        type: ChampionshipType;
        season: number;
      };
      _count: { poolUsers: number; predictions: number };
    },
    userId: number,
    userRole?: AuthUser['role'],
  ): PoolListItem {
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
}
