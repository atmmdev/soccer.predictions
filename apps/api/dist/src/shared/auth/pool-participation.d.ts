import type { AuthUser } from '../../modules/identity/application/types/auth-user.js';
export declare function canParticipateInPools(user: Pick<AuthUser, 'role'>): boolean;
export declare function assertCanParticipateInPools(user: Pick<AuthUser, 'role'>): void;
