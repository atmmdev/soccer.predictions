'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Championship } from '../../types/championship';
import { ChampionshipRow } from './championship-row';
import { ChampionshipSortableHead } from './championship-sortable-head';
import type {
  ChampionshipSortKey,
  SortDirection,
} from './hooks/use-championship-table';

interface ChampionshipTableProps {
  rows: Championship[];
  sortKey: ChampionshipSortKey;
  sortDir: SortDirection;
  onSort: (key: ChampionshipSortKey) => void;
}

export function ChampionshipTable({
  rows,
  sortKey,
  sortDir,
  onSort,
}: ChampionshipTableProps) {
  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm'>
          Nenhum campeonato encontrado com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <ChampionshipSortableHead
              label='Nome'
              column='name'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <ChampionshipSortableHead
              label='País'
              column='country'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <ChampionshipSortableHead
              label='Temporada'
              column='season'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <ChampionshipSortableHead
              label='Status'
              column='status'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
            <TableHead className='text-muted-foreground text-center text-xs'>
              Tabela de Classificação
            </TableHead>
            <TableHead className='text-muted-foreground text-right text-xs'>
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(championship => (
            <ChampionshipRow key={championship.id} championship={championship} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
