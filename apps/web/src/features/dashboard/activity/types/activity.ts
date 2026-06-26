export type ActivityType =
  | 'participant'
  | 'pool'
  | 'prediction'
  | 'match'
  | 'ranking';

export interface ActivityItem {
  id: number;
  type: ActivityType;
  message: string;
  timestamp: string;
}
