export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED';

export interface UserPrediction {
  fixtureId: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  selectedPlayerId: number | null;
}

export interface PredictionFixtureItem {
  id: number;
  poolId: number;
  poolName: string;
  championshipName: string;
  round: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  matchStatus: MatchStatus;
  prediction: UserPrediction | null;
}

export function canEditPrediction(fixture: PredictionFixtureItem): boolean {
  return fixture.matchStatus === 'SCHEDULED';
}
