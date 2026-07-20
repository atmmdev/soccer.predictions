import { Check, Users, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  DateTimeDisplay,
  dateTimeTableCellClassName,
} from '@/components/ui/datetime-display';
import { IconActionButton } from '@/components/ui/icon-action-button';
import { ResponsiveDataView } from '@/components/ui/responsive-data-view';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PoolParticipant } from '../types/participant';
import { ParticipantMembershipMobileCard } from './participant-membership-mobile-card';
import { ParticipantStatusBadge } from './participant-status-badge';

interface ParticipantMembershipsViewProps {
  memberships: PoolParticipant[];
  actingKey: string | null;
  onApprove: (poolId: number, userId: number) => void;
  onReject: (poolId: number, userId: number) => void;
}

export function ParticipantMembershipsView({
  memberships,
  actingKey,
  onApprove,
  onReject,
}: ParticipantMembershipsViewProps) {
  return (
    <ResponsiveDataView
      breakpoint='md'
      desktop={
        <div className='min-w-0 rounded-lg border bg-zinc-50/70 [&_[data-slot=table-container]]:overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='text-[11px] tracking-wide uppercase'>
                  Bolão
                </TableHead>
                <TableHead className='text-[11px] tracking-wide uppercase'>
                  Status
                </TableHead>
                <TableHead className='text-center text-[11px] tracking-wide uppercase'>
                  Palpites
                </TableHead>
                <TableHead className='text-[11px] tracking-wide uppercase'>
                  Entrada
                </TableHead>
                <TableHead className='text-center text-[11px] tracking-wide uppercase'>
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships.map(participant => {
                const actionKey = `${participant.poolId}:${participant.userId}`;
                const isActing = actingKey === actionKey;
                const canModerate =
                  participant.status === 'PENDING' && !participant.isOwner;

                return (
                  <TableRow key={participant.id} className='bg-transparent'>
                    <TableCell>
                      <div className='flex items-center gap-2 font-medium'>
                        <Users
                          className='text-muted-foreground size-4 shrink-0'
                          aria-hidden
                        />
                        <span>{participant.poolName}</span>
                        {participant.isOwner ? (
                          <Badge
                            variant='secondary'
                            className='bg-primary/10 text-xs text-primary'
                          >
                            Dono
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ParticipantStatusBadge status={participant.status} />
                    </TableCell>
                    <TableCell className='text-center tabular-nums'>
                      {participant.predictionsCount}
                    </TableCell>
                    <TableCell className={dateTimeTableCellClassName}>
                      <DateTimeDisplay value={participant.joinedAt} />
                    </TableCell>
                    <TableCell className='text-center'>
                      {canModerate ? (
                        <div className='flex items-center justify-center gap-0.5'>
                          <IconActionButton
                            label='Aprovar'
                            icon={Check}
                            tone='success'
                            loading={isActing}
                            disabled={isActing || actingKey !== null}
                            onClick={() =>
                              onApprove(participant.poolId, participant.userId)
                            }
                          />
                          <IconActionButton
                            label='Recusar'
                            icon={X}
                            tone='danger'
                            disabled={isActing || actingKey !== null}
                            onClick={() =>
                              onReject(participant.poolId, participant.userId)
                            }
                          />
                        </div>
                      ) : (
                        <span className='text-muted-foreground text-xs'>—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      }
      mobile={
        <div className='max-h-64 space-y-1.5 overflow-y-auto pr-0.5'>
          {memberships.map(participant => {
            const actionKey = `${participant.poolId}:${participant.userId}`;

            return (
              <ParticipantMembershipMobileCard
                key={participant.id}
                participant={participant}
                isActing={actingKey === actionKey}
                actingKey={actingKey}
                onApprove={onApprove}
                onReject={onReject}
              />
            );
          })}
        </div>
      }
    />
  );
}
