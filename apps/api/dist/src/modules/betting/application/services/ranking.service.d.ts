import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { ScoringService } from './scoring.service.js';
export interface RankingListItem {
    id: number;
    poolId: number;
    poolName: string;
    championshipName: string;
    name: string;
    email: string;
    avatarDataUrl: string | null;
    points: number;
    predictionsCount: number;
    scoringAchievements: {
        exactScore: number;
        winnerScore: number;
        loserScore: number;
        correctWinner: number;
        drawWithoutExactScore: number;
        playerGoal: number;
        playerHatTrick: number;
    };
    isCurrentUser: boolean;
}
export declare class RankingService {
    private readonly prisma;
    private readonly scoringService;
    constructor(prisma: PrismaService, scoringService: ScoringService);
    listForUser(user: AuthUser, poolId?: number): Promise<RankingListItem[]>;
    getPoolMemberPositions(poolIds: number[], options?: {
        syncScores?: boolean;
    }): Promise<Map<string, number>>;
    private findAccessiblePools;
    private findAccessiblePoolById;
}
