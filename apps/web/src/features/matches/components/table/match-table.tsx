'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { MatchFixtureItem } from '../../types/match-fixture';
import { MatchRow } from './match-row';

interface MatchTableProps {
  rows: MatchFixtureItem[];
}

export function MatchTable({ rows }: MatchTableProps) {
  return (
    <div className='min-w-0 [&_[data-slot=table-container]]:overflow-x-auto'>
      <Table className='border border-gray-200 bg-white'>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Data
            </TableHead>
            <TableHead className='text-muted-foreground w-1/6 text-center text-xs'>
              Jogo
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Campeonato
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Rodada
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Resultado Oficial
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(fixture => (
            <MatchRow key={fixture.id} fixture={fixture} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
