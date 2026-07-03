import type { Championship } from '@/features/championships/types/championship';

import type { PoolScoringConfig } from './scoring-rules';

export type PoolStatus = 'ACTIVE' | 'INACTIVE';

export interface Pool {
  id: number;
  name: string;
  championshipId: number;
  championshipName: string;
  championshipType: Championship['type'];
  season: number;
  participantsCount: number;
  predictionsCount: number;
  inviteCode: string;
  status: PoolStatus;
  scoring: PoolScoringConfig;
}
