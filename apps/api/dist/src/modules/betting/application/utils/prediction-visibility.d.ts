import type { FixtureStatus, PoolStatus } from '../../../../../generated/prisma/client.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
export declare function canViewMemberPrediction(viewer: Pick<AuthUser, 'id' | 'role'>, pool: Pick<{
    status: PoolStatus;
}, 'status'>, fixture: Pick<{
    status: FixtureStatus;
}, 'status'>, memberId: number): boolean;
