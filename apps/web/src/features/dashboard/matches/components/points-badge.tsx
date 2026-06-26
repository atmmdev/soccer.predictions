import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import { Match } from '../types/match';

interface PointsBadgeProps {
  match: Match;
}

export function PointsBadge({ match }: PointsBadgeProps) {
  if (match.status !== 'FINISHED') {
    return (
      <Badge
        variant='secondary'
        className='bg-muted text-muted-foreground hover:bg-muted min-w-12 justify-center font-semibold'
      >
        —
      </Badge>
    );
  }

  const { points } = match;

  return (
    <Badge
      variant='secondary'
      className={cn(
        'min-w-12 justify-center font-semibold',
        points >= 4 && 'bg-primary/10 text-primary hover:bg-primary/10',
        points > 0 && points < 4 && 'bg-amber-100 text-amber-700 hover:bg-amber-100',
        points === 0 && 'bg-destructive/10 text-destructive hover:bg-destructive/10',
      )}
    >
      {points} pts
    </Badge>
  );
}
