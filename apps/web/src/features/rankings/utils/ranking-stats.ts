import type { RankingStatKey } from '../constants/ranking-columns';
import type { RankingEntry } from '../types/ranking-entry';
import { getAchievementCount } from './ranking-scoring';

export function getRankingStatValue(
  entry: RankingEntry,
  key: RankingStatKey,
): number {
  if (key === 'predictionsCount') {
    return entry.predictionsCount;
  }

  return getAchievementCount(entry, key);
}
