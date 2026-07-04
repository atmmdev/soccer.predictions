import type { ChampionshipType, CupPhase } from '../../../../../generated/prisma/client.js';
export interface BaseScoringRules {
    exactScore: number;
    winnerScore: number;
    loserScore: number;
    correctWinner: number;
    drawWithoutExactScore: number;
    playerGoal: number;
    playerHatTrickMultiplier: number;
}
export interface CupPhaseRule {
    phase: CupPhase;
    label: string;
    multiplier: number;
}
export interface PoolScoringConfig {
    base: BaseScoringRules;
    cupPhases: CupPhaseRule[] | null;
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
export interface PredictionScoreInput {
    predictedHome: number;
    predictedAway: number;
    actualHome: number;
    actualAway: number;
    selectedPlayerId: number | null;
    playerGoalCount: number;
    championshipType: ChampionshipType;
    fixturePhase: CupPhase | null;
    scoring: PoolScoringConfig;
}
export declare function calculateMatchScore(predictedHome: number, predictedAway: number, actualHome: number, actualAway: number, base: BaseScoringRules): MatchScoreResult;
export declare function calculatePlayerGoalBonus(selectedPlayerId: number | null, playerGoalCount: number, base: BaseScoringRules): Pick<ScoringAchievementCounts, 'playerGoal' | 'playerHatTrick'> & {
    points: number;
};
export declare function getCupPhaseMultiplier(championshipType: ChampionshipType, fixturePhase: CupPhase | null, cupPhases: CupPhaseRule[] | null): number;
export declare function calculatePredictionScore(input: PredictionScoreInput): MatchScoreResult;
export declare function mergeAchievements(left: ScoringAchievementCounts, right: ScoringAchievementCounts): ScoringAchievementCounts;
export declare function parsePoolScoringConfig(value: unknown): PoolScoringConfig;
