import {
  defaultBaseScoringRules,
  defaultCupPhaseRules,
} from './scoring-templates';
import type { Pool } from '../types/pool';

const leagueScoring = {
  base: { ...defaultBaseScoringRules },
  cupPhases: null,
};

const cupScoring = {
  base: { ...defaultBaseScoringRules },
  cupPhases: defaultCupPhaseRules.map(phase => ({ ...phase })),
};

export const pools: Pool[] = [
  {
    id: 1,
    name: 'Bolão Família',
    championshipId: 1,
    championshipName: 'Brasileirão Série A',
    championshipType: 'LEAGUE',
    season: 2026,
    participantsCount: 24,
    predictionsCount: 120,
    status: 'ACTIVE',
    scoring: leagueScoring,
    isOwner: true,
  },
  {
    id: 2,
    name: 'Bolão do Trabalho',
    championshipId: 1,
    championshipName: 'Brasileirão Série A',
    championshipType: 'LEAGUE',
    season: 2026,
    participantsCount: 18,
    predictionsCount: 86,
    status: 'ACTIVE',
    scoring: leagueScoring,
    isOwner: true,
  },
  {
    id: 3,
    name: 'Champions Amigos',
    championshipId: 2,
    championshipName: 'Champions League',
    championshipType: 'CUP',
    season: 2026,
    participantsCount: 32,
    predictionsCount: 210,
    status: 'ACTIVE',
    scoring: cupScoring,
    isOwner: true,
  },
  {
    id: 4,
    name: 'La Liga VIP',
    championshipId: 1,
    championshipName: 'Brasileirão Série A',
    championshipType: 'LEAGUE',
    season: 2026,
    participantsCount: 12,
    predictionsCount: 0,
    status: 'INACTIVE',
    scoring: leagueScoring,
    isOwner: true,
  },
];
