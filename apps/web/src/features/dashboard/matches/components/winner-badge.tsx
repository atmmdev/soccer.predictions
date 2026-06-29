import { StatusBadge } from '@/components/ui/status-badge';

interface WinnerBadgeProps {
  points: number;
}

export function WinnerBadge({ points }: WinnerBadgeProps) {
  return (
    <StatusBadge tone={points > 0 ? 'success' : 'danger'}>
      {points} pts
    </StatusBadge>
  );
}
