import type {
  RankingEntry,
  RankingScoringRuleFilter,
  ScoringAchievementKey,
} from '../types/ranking-entry';

export function getAchievementCount(
  entry: RankingEntry,
  rule: ScoringAchievementKey,
): number {
  return entry.scoringAchievements[rule];
}

export function compareByScoringRule(
  a: RankingEntry,
  b: RankingEntry,
  scoringRule: RankingScoringRuleFilter,
): number {
  if (scoringRule !== 'ALL') {
    const ruleDiff =
      getAchievementCount(b, scoringRule) - getAchievementCount(a, scoringRule);

    if (ruleDiff !== 0) {
      return ruleDiff;
    }
  }

  return b.points - a.points;
}
