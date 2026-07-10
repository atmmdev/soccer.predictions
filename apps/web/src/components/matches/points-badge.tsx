import { StatusBadge, type StatusTone } from '@/components/ui/status-badge';

export function getPointsTone(points: number): StatusTone {
  if (points >= 4) {
    return 'success';
  }

  if (points > 0) {
    return 'warning';
  }

  return 'danger';
}

interface PointsBadgeProps {
  points: number | null;
  finished?: boolean;
}

export function PointsBadge({ points, finished = true }: PointsBadgeProps) {
  if (!finished || points === null) {
    return <StatusBadge tone='neutral'>—</StatusBadge>;
  }

  return (
    <StatusBadge tone={getPointsTone(points)}>
      {points} pts
    </StatusBadge>
  );
}
