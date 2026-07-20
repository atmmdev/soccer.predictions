import type { Pool } from '@/features/pools/types/pool';

interface ActivePoolMobileCardProps {
  pool: Pool;
}

export function ActivePoolMobileCard({ pool }: ActivePoolMobileCardProps) {
  return (
    <article className='rounded-lg border-b bg-card p-3 shadow-sm flex items-center justify-between'>
      <div className='min-w-0'>
        <p className='truncate text-sm font-medium'>{pool.name}</p>
        <p className='text-muted-foreground truncate text-xs'>
          {pool.championshipName}
        </p>
      </div>
      <div className='text-muted-foreground flex flex-col text-xs text-right'>
        <div>
          <span className='text-foreground font-bold'>
            {pool.participantsCount}
          </span>{' '}
          participantes
        </div>
        <div>
          <span className='text-foreground font-bold'>
            {pool.predictionsCount}
          </span>{' '}
          palpites
        </div>
      </div>
    </article>
  );
}
