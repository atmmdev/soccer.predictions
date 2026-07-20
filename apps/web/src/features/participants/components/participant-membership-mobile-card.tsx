import { Check, Users, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { IconActionButton } from '@/components/ui/icon-action-button';
import { formatDisplayDate } from '@/lib/format-datetime';

import type { PoolParticipant } from '../types/participant';
import { ParticipantStatusBadge } from './participant-status-badge';

interface ParticipantMembershipMobileCardProps {
  participant: PoolParticipant;
  isActing: boolean;
  actingKey: string | null;
  onApprove: (poolId: number, userId: number) => void;
  onReject: (poolId: number, userId: number) => void;
}

export function ParticipantMembershipMobileCard({
  participant,
  isActing,
  actingKey,
  onApprove,
  onReject,
}: ParticipantMembershipMobileCardProps) {
  const canModerate = participant.status === 'PENDING' && !participant.isOwner;

  return (
    <article className='border-border flex items-center gap-2 rounded-md border bg-card px-2.5 py-2'>

      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap justify-between'>
          <p className='truncate text-xs font-medium'>
            {participant.poolName} {' '}
            {participant.isOwner ? (
              <Badge
                variant='secondary'
                className='bg-primary/10 h-4 px-1.5 text-[10px] text-primary'
              >
                Dono
              </Badge>
            ) : null}
          </p>
          <ParticipantStatusBadge status={participant.status} />
        </div>
        <p className='text-muted-foreground truncate text-[11px]'>
          <span className='text-foreground font-medium tabular-nums'>
            {participant.predictionsCount}
          </span>{' '}
          palpites · {formatDisplayDate(participant.joinedAt)}
        </p>
      </div>
    </article>
  );
}
