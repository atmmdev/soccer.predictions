import type { PredictionFixtureItem } from '@/features/predictions/types/prediction-fixture';

import type { Match } from '../matches/types/match';

export function mapPredictionToDashboardMatch(
  item: PredictionFixtureItem,
): Match {
  return {
    id: item.id,
    homeTeam: { name: item.homeTeam, flag: '' },
    awayTeam: { name: item.awayTeam, flag: '' },
    homeScore: item.officialHomeScore ?? 0,
    awayScore: item.officialAwayScore ?? 0,
    predictedHomeScore: item.prediction?.predictedHomeScore ?? 0,
    predictedAwayScore: item.prediction?.predictedAwayScore ?? 0,
    points: item.earnedPoints ?? 0,
    date: item.date,
    status: item.matchStatus,
  };
}
