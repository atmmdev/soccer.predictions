export type ActivityType = 'participant' | 'prediction' | 'pool' | 'result';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  userName: string | null;
  avatarDataUrl: string | null;
  occurredAt: string;
}
