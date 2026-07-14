import { TableCell, TableRow } from '@/components/ui/table';

import type { Pool, PoolStatus } from '../../types/pool';
import { PoolActions } from './pool-actions';
import { PoolStatusBadge } from './pool-status-badge';

interface PoolRowProps {
  pool: Pool;
  onEdit: (pool: Pool) => void;
  onStatusChange: (poolId: number, status: PoolStatus) => Promise<boolean>;
}

export function PoolRow({ pool, onEdit, onStatusChange }: PoolRowProps) {
  return (
    <TableRow>
      <TableCell className='font-medium'>{pool.name}</TableCell>
      <TableCell>{pool.championshipName}</TableCell>
      <TableCell>{pool.season}</TableCell>
      <TableCell>{pool.participantsCount}</TableCell>
      <TableCell className='font-mono text-xs'>{pool.inviteCode}</TableCell>
      <TableCell>
        <PoolStatusBadge status={pool.status} />
      </TableCell>
      <TableCell className='text-right'>
        <PoolActions
          pool={pool}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      </TableCell>
    </TableRow>
  );
}
