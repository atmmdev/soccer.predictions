import { CheckCircle2, Clock3 } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';

import type { PoolParticipant } from '../types/participant';

export function ParticipantStatusBadge({
  status,
}: {
  status: PoolParticipant['status'];
}) {
  if (status === 'ACTIVE') {
    return (
      <StatusBadge tone='success' className='gap-1'>
        <CheckCircle2 className='size-3' aria-hidden />
        Ativo
      </StatusBadge>
    );
  }

  if (status === 'PENDING') {
    return (
      <StatusBadge tone='warning' className='gap-1'>
        <Clock3 className='size-3' aria-hidden />
        Pendente
      </StatusBadge>
    );
  }

  return <StatusBadge tone='neutral'>Inativo</StatusBadge>;
}
