import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import type { AuthUser } from '../../modules/identity/application/types/auth-user.js';

@Injectable()
export class PoolAccessGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user: AuthUser;
      params: { id?: string; poolId?: string };
    }>();
    const user = request.user;
    const rawId = request.params.id ?? request.params.poolId;
    const poolId = Number(rawId);

    if (!Number.isInteger(poolId) || poolId <= 0) {
      throw new NotFoundException('Bolão não encontrado');
    }

    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    const pool = await this.prisma.pool.findUnique({
      where: { id: poolId },
      include: {
        poolUsers: {
          where: { userId: user.id, status: 'ACTIVE' },
          take: 1,
        },
      },
    });

    if (!pool) {
      throw new NotFoundException('Bolão não encontrado');
    }

    const isOwner = pool.ownerId === user.id;
    const isMember = pool.poolUsers.length > 0;

    if (isOwner || isMember) {
      return true;
    }

    throw new ForbiddenException('Você não tem acesso a este bolão');
  }
}
