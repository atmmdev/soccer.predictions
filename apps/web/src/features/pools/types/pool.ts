export type PoolStatus = 'ACTIVE' | 'INACTIVE';

export interface Pool {
  id: number;
  name: string;
  championshipId: number;
  championshipName: string;
  season: number;
  participantsCount: number;
  inviteCode: string;
  status: PoolStatus;
}
