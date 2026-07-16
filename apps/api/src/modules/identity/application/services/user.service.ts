import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { UpdateProfileDto } from '../dtos/update-profile.dto.js';
import type { AuthUser } from '../types/auth-user.js';

export interface PoolDelegateCandidate {
  id: number;
  name: string;
  email: string;
  avatarDataUrl: string | null;
  role: 'ADMIN' | 'PARTICIPANT';
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProfile(
    userId: number,
    dto: UpdateProfileDto,
  ): Promise<AuthUser> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        name: dto.name,
        ...(dto.phone !== undefined ? { phone: dto.phone } : {}),
        ...(dto.avatarDataUrl !== undefined
          ? { avatarDataUrl: dto.avatarDataUrl }
          : {}),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatarDataUrl: true,
        role: true,
      },
    });

    return user;
  }

  async listPoolDelegateCandidates(): Promise<PoolDelegateCandidate[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'PARTICIPANT'] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarDataUrl: true,
        role: true,
      },
      orderBy: { name: 'asc' },
    });

    return users as PoolDelegateCandidate[];
  }
}
