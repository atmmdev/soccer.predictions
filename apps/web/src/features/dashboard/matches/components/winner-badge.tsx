import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WinnerBadgeProps {
  points: number;
}

export function WinnerBadge({ points }: WinnerBadgeProps) {
  return (
    <Badge
      variant='secondary'
      className={cn(
        'font-semibold',
        points > 0
          ? 'bg-primary/10 text-primary hover:bg-primary/10'
          : 'bg-destructive/10 text-destructive hover:bg-destructive/10',
      )}
    >
      {points} pts
    </Badge>
  );
}
