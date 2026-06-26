import { Badge } from '@/components/ui/badge';

interface MatchStatusBadgeProps {
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
}

export function MatchStatusBadge({ status }: MatchStatusBadgeProps) {
  if (status === 'SCHEDULED') {
    return (
      <Badge variant='secondary' className='mt-1 text-xs font-normal'>
        Agendado
      </Badge>
    );
  }

  if (status === 'LIVE') {
    return (
      <Badge className='mt-1 bg-primary text-xs font-normal hover:bg-primary'>
        Ao vivo
      </Badge>
    );
  }

  return (
    <Badge variant='outline' className='mt-1 text-xs font-normal'>
      Finalizado
    </Badge>
  );
}
