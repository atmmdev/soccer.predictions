'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Pool } from '../../types/pool';
import type { PoolSortKey, SortDirection } from '../../hooks/use-pool-table';
import { PoolRow } from './pool-row';
import { PoolSortableHead } from './pool-sortable-head';

interface PoolTableProps {
  rows: Pool[];
  sortKey: PoolSortKey;
  sortDir: SortDirection;
  onSort: (key: PoolSortKey) => void;
}

export function PoolTable({ rows, sortKey, sortDir, onSort }: PoolTableProps) {
  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm'>
          Nenhum bolão encontrado com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
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
            <TableHead className='text-muted-foreground text-xs'>Código</TableHead>
            <PoolSortableHead
              label='Status'
              column='status'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <TableHead className='text-muted-foreground text-right text-xs'>
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(pool => (
            <PoolRow key={pool.id} pool={pool} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
