export type ActivityType = 'participant' | 'prediction' | 'pool' | 'result';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  occurredAt: string;
}
