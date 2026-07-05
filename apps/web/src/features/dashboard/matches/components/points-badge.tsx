import { PointsBadge as SharedPointsBadge } from '@/components/matches/points-badge';

import { Match } from '../types/match';

interface PointsBadgeProps {
  match: Match;
}

export function PointsBadge({ match }: PointsBadgeProps) {
  return (
    <SharedPointsBadge
      points={match.points}
      finished={match.status === 'FINISHED'}
    />
  );
}
