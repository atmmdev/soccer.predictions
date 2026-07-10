import type { PredictionFixtureItem } from '@/features/predictions/types/prediction-fixture';

import type { Match } from '../matches/types/match';

export function mapPredictionToDashboardMatch(
  item: PredictionFixtureItem,
): Match {
  return {
    id: item.id,
    homeTeam: { name: item.homeTeam, flag: item.homeTeamLogo },
    awayTeam: { name: item.awayTeam, flag: item.awayTeamLogo },
    homeScore: item.officialHomeScore,
    awayScore: item.officialAwayScore,
    predictedHomeScore: item.prediction?.predictedHomeScore ?? null,
    predictedAwayScore: item.prediction?.predictedAwayScore ?? null,
    points: item.prediction ? (item.earnedPoints ?? null) : null,
    date: item.date,
    status: item.matchStatus,
  };
}
