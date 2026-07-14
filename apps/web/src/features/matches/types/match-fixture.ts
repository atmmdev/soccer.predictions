import type { CupPhase } from '@/features/pools/types/scoring-rules';

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED';

export interface MatchFixtureItem {
  id: number;
  championshipName: string;
  round: number | null;
  phase: CupPhase | null;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  status: MatchStatus;
  officialHomeScore: number | null;
  officialAwayScore: number | null;
}
