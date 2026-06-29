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
  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-center text-sm'>
          Nenhum jogo encontrado com os filtros selecionados.
          <br />
          Tente limpar a busca, o intervalo de datas e usar &quot;Todos&quot; nos
          filtros.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='text-muted-foreground text-xs'>Data</TableHead>
            <TableHead className='text-muted-foreground text-xs'>Status</TableHead>
            <TableHead className='text-muted-foreground text-xs'>Jogo</TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Campeonato
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Rodada
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Resultado Oficial
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
