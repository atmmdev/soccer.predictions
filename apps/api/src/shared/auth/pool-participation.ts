import { ForbiddenException } from '@nestjs/common';

import type { AuthUser } from '../../modules/identity/application/types/auth-user.js';

export function canParticipateInPools(user: Pick<AuthUser, 'role'>): boolean {
  return user.role !== 'SUPER_ADMIN';
}

export function assertCanParticipateInPools(user: Pick<AuthUser, 'role'>): void {
  if (!canParticipateInPools(user)) {
    throw new ForbiddenException(
      'Super administradores não participam de bolões. Você pode criar bolões para outros participantes.',
    );
  }
}
