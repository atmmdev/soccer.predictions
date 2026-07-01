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
export class PoolOwnerGuard implements CanActivate {
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
      select: { ownerId: true },
    });

    if (!pool) {
      throw new NotFoundException('Bolão não encontrado');
    }

    if (pool.ownerId !== user.id) {
      throw new ForbiddenException('Somente o proprietário pode executar esta ação');
    }

    return true;
  }
}
