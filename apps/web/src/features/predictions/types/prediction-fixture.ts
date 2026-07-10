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
  /** Posição atual do participante no ranking do bolão. */
  poolPosition: number;
  participantId: number;
  participantName: string;
  isOwnPrediction: boolean;
  championshipName: string;
  round: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  matchStatus: MatchStatus;
  /** Placar oficial; null enquanto o jogo não começou. */
  officialHomeScore: number | null;
  officialAwayScore: number | null;
  earnedPoints: number | null;
  prediction: UserPrediction | null;
}
