import { Team } from './team';

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  predictedHomeScore: number | null;
  predictedAwayScore: number | null;
  points: number | null;
  date: string;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
}
