import type {
  RankingEntry,
  ScoringAchievementKey,
} from '../types/ranking-entry';

export function getAchievementCount(
  entry: RankingEntry,
  rule: ScoringAchievementKey,
): number {
  return entry.scoringAchievements[rule];
}
