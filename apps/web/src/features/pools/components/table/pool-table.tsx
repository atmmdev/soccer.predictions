'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PoolSortKey, SortDirection } from '../../hooks/use-pool-table';
import type { Pool, PoolStatus } from '../../types/pool';
import { PoolRow } from './pool-row';
import { PoolSortableHead } from './pool-sortable-head';

interface PoolTableProps {
  rows: Pool[];
  sortKey: PoolSortKey;
  sortDir: SortDirection;
  onSort: (key: PoolSortKey) => void;
  onEdit: (pool: Pool) => void;
  onStatusChange: (poolId: number, status: PoolStatus) => Promise<boolean>;
}

export function PoolTable({
  rows,
  sortKey,
  sortDir,
  onSort,
  onEdit,
  onStatusChange,
}: PoolTableProps) {
  return (
    <div className='min-w-0 [&_[data-slot=table-container]]:overflow-x-auto'>
      <Table className='bg-white'>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <PoolSortableHead
              label='Nome'
              column='name'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <PoolSortableHead
              label='Campeonato'
              column='championshipName'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <PoolSortableHead
              label='Temporada'
              column='season'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <PoolSortableHead
              label='Participantes'
              column='participantsCount'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <TableHead className='text-muted-foreground text-xs'>
              Código
            </TableHead>
            <PoolSortableHead
              label='Status'
              column='status'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <TableHead className='text-muted-foreground text-center text-xs'>
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(pool => (
            <PoolRow
              key={pool.id}
              pool={pool}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
