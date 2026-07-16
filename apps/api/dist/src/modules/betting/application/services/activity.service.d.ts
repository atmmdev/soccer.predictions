import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
export type ActivityType = 'participant' | 'prediction' | 'pool' | 'result';
export interface ActivityItem {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    occurredAt: string;
}
export declare class ActivityService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(user: AuthUser, limitQuery?: number): Promise<ActivityItem[]>;
    private normalizeLimit;
    private findAccessiblePools;
}
