'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNow } from '@/hooks/use-now';

import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import { PredictionRow } from './prediction-row';

interface PredictionTableProps {
  rows: PredictionFixtureItem[];
  onPredict: (fixture: PredictionFixtureItem) => void;
}

export function PredictionTable({ rows, onPredict }: PredictionTableProps) {
  const now = useNow();
  const showParticipantColumn = rows.some(row => !row.isOwnPrediction);

  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm text-center'>
          Nenhum jogo encontrado com os filtros selecionados.
          <br />
          Tente limpar a busca e usar &quot;Todos&quot; nos filtros de bolão e
          palpite.
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
            {showParticipantColumn ? (
              <TableHead className='text-muted-foreground text-xs'>
                Participante
              </TableHead>
            ) : null}
            <TableHead className='text-muted-foreground text-center text-xs'>
              Posição
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Rodada
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Resultado
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Palpite
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Jogador
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>Status</TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Prazo
            </TableHead>
            <TableHead className='text-muted-foreground text-right text-xs'>
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(fixture => (
            <PredictionRow
              key={`${fixture.poolId}-${fixture.id}-${fixture.participantId}`}
              fixture={fixture}
              now={now}
              showParticipantColumn={showParticipantColumn}
              onPredict={onPredict}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
