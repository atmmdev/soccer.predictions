import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../shared/prisma/prisma.service.js';

export interface PoolDelegateCandidate {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'PARTICIPANT';
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async listPoolDelegateCandidates(): Promise<PoolDelegateCandidate[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'PARTICIPANT'] },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { name: 'asc' },
    });

    return users as PoolDelegateCandidate[];
  }
}
