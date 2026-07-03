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

export function getPositionAccentClass(position: number, total: number): string {
  if (position === 1) {
    return 'border-l-4 border-l-blue-500';
  }

  if (position === 2) {
    return 'border-l-4 border-l-blue-400';
  }

  if (position === 3) {
    return 'border-l-4 border-l-blue-300';
  }

  if (total >= 5 && position === total) {
    return 'border-l-4 border-l-red-500';
  }

  return 'border-l-4 border-l-transparent';
}
