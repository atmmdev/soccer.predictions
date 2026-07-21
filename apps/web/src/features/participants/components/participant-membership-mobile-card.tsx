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
        <div className='flex flex-wrap justify-between gap-1.5'>
          <span className='truncate text-sm font-medium'>
            {participant.poolName}{' '}
            {participant.isOwner ? (
              <Badge
                variant='secondary'
                className='bg-primary/10 h-4 px-1.5 text-[10px] text-primary'
              >
                Dono
              </Badge>
            ) : null}
          </span>

          <ParticipantStatusBadge status={participant.status} />
        </div>
        <div className='text-muted-foreground truncate text-[11px]'>
          <span className='text-foreground font-medium tabular-nums'>
            {participant.predictionsCount}
          </span>{' '}
          palpites · {formatDisplayDate(participant.joinedAt)}
        </div>
      </div>

      {canModerate ? (
        <div className='flex shrink-0 gap-0.5'>
          <IconActionButton
            label='Aprovar'
            icon={Check}
            tone='success'
            loading={isActing}
            disabled={isActing || actingKey !== null}
            onClick={() => onApprove(participant.poolId, participant.userId)}
          />
          <IconActionButton
            label='Recusar'
            icon={X}
            tone='danger'
            disabled={isActing || actingKey !== null}
            onClick={() => onReject(participant.poolId, participant.userId)}
          />
        </div>
      ) : null}
    </article>
  );
}
