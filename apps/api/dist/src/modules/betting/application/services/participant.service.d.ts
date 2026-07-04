import type { PoolUserStatus } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
export interface PoolParticipantItem {
    id: number;
    poolId: number;
    poolName: string;
    inviteCode: string;
    userId: number;
    name: string;
    email: string;
    isOwner: boolean;
    status: PoolUserStatus;
    joinedAt: string;
    predictionsCount: number;
}
export declare class ParticipantService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(user: AuthUser): Promise<PoolParticipantItem[]>;
    private loadPredictionCounts;
}
