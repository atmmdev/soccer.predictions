export type ScoringAchievementKey =
  | 'exactScore'
  | 'winnerScore'
  | 'loserScore'
  | 'correctWinner'
  | 'drawWithoutExactScore'
  | 'playerGoal'
  | 'playerHatTrick';

export type RankingScoringRuleFilter = 'ALL' | ScoringAchievementKey;

export interface RankingScoringAchievements {
  exactScore: number;
  winnerScore: number;
  loserScore: number;
  correctWinner: number;
  drawWithoutExactScore: number;
  playerGoal: number;
  playerHatTrick: number;
}

export interface RankingEntry {
  id: number;
  poolId: number;
  poolName: string;
  championshipName: string;
  name: string;
  points: number;
  predictionsCount: number;
  scoringAchievements: RankingScoringAchievements;
  isCurrentUser?: boolean;
}
