import { Badge } from '@/components/ui/badge';

interface MatchStatusBadgeProps {
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
}

export function MatchStatusBadge({ status }: MatchStatusBadgeProps) {
  if (status === 'SCHEDULED') {
    return (
      <Badge variant='secondary' className='text-xs'>
        Agendada
      </Badge>
    );
  }
  if (status === 'LIVE') {
    return (
      <Badge variant='default' className='text-xs'>
        Ao Vivo
      </Badge>
    );
  }

  return (
    <Badge variant='destructive' className='text-xs'>
      Finalizada
    </Badge>
  );
}
