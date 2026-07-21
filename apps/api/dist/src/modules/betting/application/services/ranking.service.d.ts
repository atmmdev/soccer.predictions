import type { ChampionshipType } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { ScoringService } from './scoring.service.js';
export interface RankingListItem {
    id: number;
    poolId: number;
    poolName: string;
    championshipName: string;
    championshipType: ChampionshipType;
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
export interface RankingContext {
    poolId: number;
    championshipType: ChampionshipType;
    championshipName: string;
    rounds: number[];
}
export declare class RankingService {
    private readonly prisma;
    private readonly scoringService;
    constructor(prisma: PrismaService, scoringService: ScoringService);
    listForUser(user: AuthUser, poolId?: number, round?: number): Promise<RankingListItem[]>;
    getContextForPool(user: AuthUser, poolId: number): Promise<RankingContext>;
    getPoolMemberPositions(poolIds: number[], options?: {
        syncScores?: boolean;
    }): Promise<Map<string, number>>;
    private resolveRoundFilter;
    private findAccessiblePools;
    private findAccessiblePoolById;
}
