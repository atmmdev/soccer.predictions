export type ActivityType = 'participant' | 'prediction' | 'pool' | 'result';

export interface ActivityItem {
  id: number;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}
