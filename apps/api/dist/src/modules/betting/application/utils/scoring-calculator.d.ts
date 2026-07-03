export interface BaseScoringRules {
    exactScore: number;
    winnerScore: number;
    loserScore: number;
    correctWinner: number;
    drawWithoutExactScore: number;
    playerGoal: number;
    playerHatTrickMultiplier: number;
}
export interface PoolScoringConfig {
    base: BaseScoringRules;
    cupPhases: unknown[] | null;
}
export interface ScoringAchievementCounts {
    exactScore: number;
    winnerScore: number;
    loserScore: number;
    correctWinner: number;
    drawWithoutExactScore: number;
    playerGoal: number;
    playerHatTrick: number;
}
export interface MatchScoreResult {
    points: number;
    achievements: ScoringAchievementCounts;
}
export declare function calculateMatchScore(predictedHome: number, predictedAway: number, actualHome: number, actualAway: number, base: BaseScoringRules): MatchScoreResult;
export declare function mergeAchievements(left: ScoringAchievementCounts, right: ScoringAchievementCounts): ScoringAchievementCounts;
export declare function parsePoolScoringConfig(value: unknown): PoolScoringConfig;
