import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { type ScoringAchievementCounts } from '../utils/scoring-calculator.js';
export declare class ScoringService {
    private readonly prisma;
    private readonly syncingPools;
    constructor(prisma: PrismaService);
    syncPoolScores(poolId: number): Promise<void>;
    syncPoolsScores(poolIds: number[]): Promise<void>;
    syncScoresForChampionship(championshipId: number): Promise<void>;
    private runPoolScoreSync;
    private scoreFixture;
    private resolvePrimaryAchievement;
    static aggregateBreakdown(entries: Array<{
        breakdown: unknown | null;
        points: number;
    }>): {
        points: number;
        achievements: ScoringAchievementCounts;
    };
}
