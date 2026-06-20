import { Badge } from '@/components/ui/badge';

interface WinnerBadgeProps {
  points: number;
}

export function WinnerBadge({ points }: WinnerBadgeProps) {
  return (
    <Badge variant='ghost' className='ml-2'>
      +{points} pts
    </Badge>
  );
}
