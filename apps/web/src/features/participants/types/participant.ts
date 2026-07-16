export type ParticipantStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

export interface PoolParticipant {
  id: number;
  poolId: number;
  poolName: string;
  inviteCode: string;
  userId: number;
  name: string;
  email: string;
  avatarDataUrl: string | null;
  isOwner: boolean;
  status: ParticipantStatus;
  joinedAt: string;
  predictionsCount: number;
}
