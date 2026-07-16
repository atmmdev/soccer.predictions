/** Critério oficial: pontos → placares exatos → nome A–Z. */
export function compareRankingStandings(
  left: { points: number; exactScore: number; name: string },
  right: { points: number; exactScore: number; name: string },
): number {
  if (right.points !== left.points) {
    return right.points - left.points;
  }

  if (right.exactScore !== left.exactScore) {
    return right.exactScore - left.exactScore;
  }

  return left.name.localeCompare(right.name, 'pt-BR');
}
