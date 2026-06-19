import { Badge } from '@/components/ui/badge';

interface MatchStatusBadgeProps {
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
}

export function MatchStatusBadge({ status }: MatchStatusBadgeProps) {
  if (status === 'SCHEDULED') {
    return (
      <Badge variant='outline' className='text-xs bg-blue-700 text-white'>
        Agendada
      </Badge>
    );
  }
  if (status === 'LIVE') {
    return (
      <Badge variant='outline' className='text-xs bg-green-700 text-white'>
        Ao Vivo
      </Badge>
    );
  }

  return (
    <Badge variant='outline' className='text-xs bg-red-700 text-white'>
      Finalizada
    </Badge>
  );
}
