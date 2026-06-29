import type { Pool } from '../types/pool';

export const pools: Pool[] = [
  {
    id: 1,
    name: 'Bolão Família',
    championshipId: 1,
    championshipName: 'Brasileirão Série A',
    season: 2026,
    participantsCount: 24,
    inviteCode: 'FAM2026',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Bolão do Trabalho',
    championshipId: 1,
    championshipName: 'Brasileirão Série A',
    season: 2026,
    participantsCount: 18,
    inviteCode: 'TRB2026',
    status: 'ACTIVE',
  },
  {
    id: 3,
    name: 'Champions Amigos',
    championshipId: 2,
    championshipName: 'Champions League',
    season: 2026,
    participantsCount: 32,
    inviteCode: 'UCL2026',
    status: 'ACTIVE',
  },
  {
    id: 4,
    name: 'La Liga VIP',
    championshipId: 1,
    championshipName: 'Brasileirão Série A',
    season: 2026,
    participantsCount: 12,
    inviteCode: 'VIP2026',
    status: 'INACTIVE',
  },
];
