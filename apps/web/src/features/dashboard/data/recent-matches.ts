import { Match } from '@/types/match';

export const recentMatches: Match[] = [
  {
    id: 1,
    homeTeam: 'Flamengo',
    awayTeam: 'Palmeiras',
    homeScore: 3,
    awayScore: 3,

    predictedHomeScore: 3,
    predictedAwayScore: 0,

    points: 11,

    date: '2024-06-01T15:00:00Z',
    status: 'FINISHED',
  },
  {
    id: 2,
    homeTeam: 'Botafogo',
    awayTeam: 'Corinthians',
    homeScore: 3,
    awayScore: 1,
    predictedHomeScore: 2,
    predictedAwayScore: 1,
    points: 3,
    date: '2024-06-01T15:00:00Z',
    status: 'LIVE',
  },
  {
    id: 3,
    homeTeam: 'Vasco',
    awayTeam: 'Fluminense',
    homeScore: 2,
    awayScore: 1,
    predictedHomeScore: 2,
    predictedAwayScore: 1,
    points: 3,
    date: '2024-06-01T15:00:00Z',
    status: 'SCHEDULED',
  },
  
];
