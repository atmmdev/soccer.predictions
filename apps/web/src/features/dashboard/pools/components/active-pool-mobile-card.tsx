import type { Pool } from '@/features/pools/types/pool';

interface ActivePoolMobileCardProps {
  pool: Pool;
}

export function ActivePoolMobileCard({ pool }: ActivePoolMobileCardProps) {
  return (
    <article className='border-border space-y-2 rounded-lg border bg-card p-3 shadow-sm'>
      <div className='min-w-0'>
        <p className='truncate text-sm font-medium'>{pool.name}</p>
        <p className='text-muted-foreground truncate text-xs'>
          {pool.championshipName}
        </p>
      </div>
      <div className='text-muted-foreground flex items-center gap-4 text-xs'>
        <span>
          <span className='text-foreground font-bold'>
            {pool.participantsCount}
          </span>{' '}
          participantes
        </span>
        <span>
          <span className='text-foreground font-bold'>
            {pool.predictionsCount}
          </span>{' '}
          palpites
        </span>
      </div>
    </article>
  );
}
