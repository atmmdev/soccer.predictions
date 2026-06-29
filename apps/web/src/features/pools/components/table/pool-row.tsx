import { TableCell, TableRow } from '@/components/ui/table';

import type { Pool } from '../../types/pool';
import { PoolActions } from './pool-actions';
import { PoolStatusBadge } from './pool-status-badge';

interface PoolRowProps {
  pool: Pool;
}

export function PoolRow({ pool }: PoolRowProps) {
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
        <PoolActions pool={pool} />
      </TableCell>
    </TableRow>
  );
}
