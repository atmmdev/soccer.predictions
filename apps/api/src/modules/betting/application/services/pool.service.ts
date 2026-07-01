import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Pool, Prisma } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import type { CreatePoolDto } from '../dtos/create-pool.dto.js';
import type { JoinPoolDto } from '../dtos/join-pool.dto.js';
import { generateInviteCode } from '../utils/generate-invite-code.js';

export interface PoolListItem {
  id: number;
  name: string;
  championshipId: number;
  inviteCode: string;
  status: Pool['status'];
  scoring: Prisma.JsonValue;
  ownerId: number;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
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
    });

    return pools.map(pool => this.toPoolListItem(pool, user.id));
  }

  async getByIdForUser(poolId: number, user: AuthUser): Promise<PoolListItem> {
    const pool = await this.findAccessiblePool(poolId, user);

    return this.toPoolListItem(pool, user.id);
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

    const result = await this.prisma.$transaction(async tx => {
      const pool = await tx.pool.create({
        data: {
          ownerId: user.id,
          championshipId: dto.championshipId,
          name: dto.name,
          inviteCode,
          scoring: dto.scoring as Prisma.InputJsonValue,
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
      pool: this.toPoolListItem(result.pool, result.user.id),
      user: result.user,
    };
  }

  async join(dto: JoinPoolDto, user: AuthUser): Promise<PoolListItem> {
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
      return this.toPoolListItem(pool, user.id);
    }

    if (existingMembership) {
      await this.prisma.poolUser.update({
        where: { id: existingMembership.id },
        data: { status: 'ACTIVE' },
      });

      return this.toPoolListItem(pool, user.id);
    }

    await this.prisma.poolUser.create({
      data: {
        poolId: pool.id,
        userId: user.id,
        status: 'ACTIVE',
      },
    });

    return this.toPoolListItem(pool, user.id);
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

  private toPoolListItem(pool: Pool, userId: number): PoolListItem {
    return {
      id: pool.id,
      name: pool.name,
      championshipId: pool.championshipId,
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
