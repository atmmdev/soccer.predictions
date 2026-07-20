import type { Pool, PoolStatus } from '../../types/pool';
import { PoolActions } from './pool-actions';
import { PoolStatusBadge } from './pool-status-badge';

interface PoolMobileCardProps {
  pool: Pool;
  onEdit: (pool: Pool) => void;
  onStatusChange: (poolId: number, status: PoolStatus) => Promise<boolean>;
}

export function PoolMobileCard({
  pool,
  onEdit,
  onStatusChange,
}: PoolMobileCardProps) {
  return (
    <article className='border-border space-y-3 rounded-lg border bg-card p-3 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium'>{pool.name}</p>
          <p className='text-muted-foreground mt-1 truncate text-xs'>
            {pool.championshipName} · {pool.season}
          </p>
          <p className='text-muted-foreground mt-1 text-xs'>
            <span className='text-foreground font-medium'>
              {pool.participantsCount}
            </span>{' '}
            participantes ·{' '}
            <span className='font-mono'>{pool.inviteCode}</span>
          </p>
        </div>
        <PoolStatusBadge status={pool.status} />
      </div>

      <div className='flex justify-end'>
        <PoolActions
          pool={pool}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      </div>
    </article>
  );
}
