import type { Championship } from '@/features/championships/types/championship';

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
  championshipType: Championship['type'];
  name: string;
  email: string;
  avatarDataUrl: string | null;
  points: number;
  predictionsCount: number;
  scoringAchievements: RankingScoringAchievements;
  isCurrentUser?: boolean;
}

export interface RankingPoolOption {
  id: number;
  name: string;
}

export interface RankingContext {
  poolId: number;
  championshipType: Championship['type'];
  championshipName: string;
  rounds: number[];
}
