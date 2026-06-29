'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import { PredictionRow } from './prediction-row';

interface PredictionTableProps {
  rows: PredictionFixtureItem[];
  onEdit: (fixture: PredictionFixtureItem) => void;
}

export function PredictionTable({ rows, onEdit }: PredictionTableProps) {
  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm'>
          Nenhum jogo encontrado com os filtros selecionados.
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
            <TableHead className='text-muted-foreground text-xs'>Jogo</TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Campeonato
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>Bolão</TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Rodada
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Palpite
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Jogador
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>Status</TableHead>
            <TableHead className='text-muted-foreground text-right text-xs'>
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(fixture => (
            <PredictionRow
              key={fixture.id}
              fixture={fixture}
              onEdit={onEdit}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
