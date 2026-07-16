import type { RankingEntry } from '../types/ranking-entry';

/** Critério oficial: pontos → placares exatos → nome A–Z. */
export function compareRankingStandings(
  left: Pick<RankingEntry, 'points' | 'name'> & {
    scoringAchievements?: { exactScore: number };
    exactScore?: number;
  },
  right: Pick<RankingEntry, 'points' | 'name'> & {
    scoringAchievements?: { exactScore: number };
    exactScore?: number;
  },
): number {
  if (right.points !== left.points) {
    return right.points - left.points;
  }

  const leftExact =
    left.exactScore ?? left.scoringAchievements?.exactScore ?? 0;
  const rightExact =
    right.exactScore ?? right.scoringAchievements?.exactScore ?? 0;

  if (rightExact !== leftExact) {
    return rightExact - leftExact;
  }

  return left.name.localeCompare(right.name, 'pt-BR');
}
