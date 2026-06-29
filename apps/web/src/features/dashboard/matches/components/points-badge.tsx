import { StatusBadge, type StatusTone } from '@/components/ui/status-badge';

import { Match } from '../types/match';

interface PointsBadgeProps {
  match: Match;
}

function getPointsTone(points: number): StatusTone {
  if (points >= 4) {
    return 'success';
  }

  if (points > 0) {
    return 'warning';
  }

  return 'danger';
}

export function PointsBadge({ match }: PointsBadgeProps) {
  if (match.status !== 'FINISHED') {
    return <StatusBadge tone='neutral'>—</StatusBadge>;
  }

  return (
    <StatusBadge tone={getPointsTone(match.points)}>
      {match.points} pts
    </StatusBadge>
  );
}
