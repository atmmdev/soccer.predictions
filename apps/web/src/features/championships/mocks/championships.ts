import { Championship } from '../types/championship';

export const championships: Championship[] = [
  {
    id: 1,
    leagueId: 1,
    flags: '',
    type: 'LEAGUE',
    name: 'Brasileirão Série A',
    country: 'Brasil',
    season: 2026,
    status: 'ACTIVE',
  },
  {
    id: 2,
    leagueId: 2,
    flags: '',
    type: 'CUP',
    name: 'Champions League',
    country: 'Europa',
    season: 2026,
    status: 'ACTIVE',
  },
  {
    id: 3,
    leagueId: 3,
    flags: '',
    type: 'CUP',
    name: 'Libertadores',
    country: 'América do Sul',
    season: 2026,
    status: 'INACTIVE',
  },
];
