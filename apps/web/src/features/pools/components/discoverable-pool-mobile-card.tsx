import type { ReactNode } from 'react';

import { UserAvatar } from '@/components/ui/user-avatar';

import type { DiscoverablePool } from '../types/pool';

interface DiscoverablePoolMobileCardProps {
  pool: DiscoverablePool;
  action: ReactNode;
}

export function DiscoverablePoolMobileCard({
  pool,
  action,
}: DiscoverablePoolMobileCardProps) {
  return (
    <article className='border-border space-y-3 rounded-lg border bg-card p-3 shadow-sm'>
      <div className='min-w-0'>
        <p className='truncate text-sm font-medium'>{pool.name}</p>
        <p className='text-muted-foreground mt-1 truncate text-xs'>
          {pool.championshipName} · {pool.season}
        </p>
        <p className='text-muted-foreground mt-1 text-xs'>
          <span className='text-foreground font-medium'>
            {pool.participantsCount}
          </span>{' '}
          participantes
        </p>
      </div>

      <div className='flex items-center justify-between gap-3'>
        <div className='flex min-w-0 items-center gap-2'>
          <UserAvatar
            name={pool.ownerName}
            avatarDataUrl={pool.ownerAvatarDataUrl}
            className='size-7'
          />
          <span className='truncate text-sm'>{pool.ownerName}</span>
        </div>
        <div className='shrink-0'>{action}</div>
      </div>
    </article>
  );
}
