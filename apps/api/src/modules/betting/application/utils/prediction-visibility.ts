import type { FixtureStatus, PoolStatus } from '../../../../../generated/prisma/client.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';

export function canViewMemberPrediction(
  viewer: Pick<AuthUser, 'id' | 'role'>,
  pool: Pick<{ status: PoolStatus }, 'status'>,
  fixture: Pick<{ status: FixtureStatus }, 'status'>,
  memberId: number,
): boolean {
  if (viewer.role === 'SUPER_ADMIN') {
    return true;
  }

  if (memberId === viewer.id) {
    return true;
  }

  return fixture.status === 'FINISHED' && pool.status === 'CLOSED';
}
