import type { Pool, PoolStatus } from '../../types/pool';
import { PoolMobileCard } from './pool-mobile-card';

interface PoolMobileListProps {
  rows: Pool[];
  onEdit: (pool: Pool) => void;
  onStatusChange: (poolId: number, status: PoolStatus) => Promise<boolean>;
}

export function PoolMobileList({
  rows,
  onEdit,
  onStatusChange,
}: PoolMobileListProps) {
  return (
    <div className='space-y-3'>
      {rows.map(pool => (
        <PoolMobileCard
          key={pool.id}
          pool={pool}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
