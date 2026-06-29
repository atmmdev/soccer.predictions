import { getCountryFlag } from './countries';
import { Championship } from '../types/championship';

export const championships: Championship[] = [
  {
    id: 1,
    leagueId: 71,
    flags: getCountryFlag('Brasil'),
    type: 'LEAGUE',
    name: 'Brasileirão Série A',
    country: 'Brasil',
    season: 2026,
    status: 'ACTIVE',
  },
  {
    id: 2,
    leagueId: 2,
    flags: '🏆',
    type: 'CUP',
    name: 'Champions League',
    country: 'Europa',
    season: 2026,
    status: 'ACTIVE',
  },
  {
    id: 3,
    leagueId: 13,
    flags: '🏆',
    type: 'CUP',
    name: 'Libertadores',
    country: 'América do Sul',
    season: 2026,
    status: 'INACTIVE',
  },
];
