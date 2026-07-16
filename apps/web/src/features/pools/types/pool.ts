import type { Championship } from '@/features/championships/types/championship';

import type { PoolScoringConfig } from './scoring-rules';

export type PoolStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED';

export type DiscoverMembershipStatus = 'PENDING' | 'INACTIVE' | null;

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
  isOwner: boolean;
}

export interface DiscoverablePool {
  id: number;
  name: string;
  championshipName: string;
  championshipType: Championship['type'];
  season: number;
  participantsCount: number;
  ownerId: number;
  ownerName: string;
  ownerAvatarDataUrl: string | null;
  status: PoolStatus;
  membershipStatus: DiscoverMembershipStatus;
}
