import type { Pool } from '@/features/pools/types/pool';

import { ActivePoolMobileCard } from './active-pool-mobile-card';

interface ActivePoolsMobileListProps {
  pools: Pool[];
}

export function ActivePoolsMobileList({ pools }: ActivePoolsMobileListProps) {
  return (
    <div className='space-y-2'>
      {pools.map(pool => (
        <ActivePoolMobileCard key={pool.id} pool={pool} />
      ))}
    </div>
  );
}
