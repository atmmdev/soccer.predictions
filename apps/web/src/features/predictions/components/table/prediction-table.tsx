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
import {
  predictionTableColumns,
  predictionTableHeadClass,
} from './prediction-table-columns';

interface PredictionTableProps {
  rows: PredictionFixtureItem[];
  onPredict: (fixture: PredictionFixtureItem) => void;
  onViewAllPredictions: (fixture: PredictionFixtureItem) => void;
}

export function PredictionTable({
  rows,
  onPredict,
  onViewAllPredictions,
}: PredictionTableProps) {
  const now = useNow();
  const showParticipantColumn = rows.some(row => !row.isOwnPrediction);

  if (rows.length === 0) {
    return null;
  }

  return (
    <div className='hidden min-w-0 overflow-hidden xl:block [&_[data-slot=table-container]]:overflow-x-hidden [&_[data-slot=table-head]]:px-1.5 [&_[data-slot=table-cell]]:px-1.5'>
      <Table className='table-fixed'>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead className={predictionTableHeadClass('w-[6.5rem]')}>Data</TableHead>
            <TableHead className={predictionTableHeadClass('min-w-[9rem]')}>Jogo</TableHead>
            <TableHead
              className={predictionTableHeadClass(
                predictionTableColumns.championship,
              )}
            >
              Campeonato
            </TableHead>
            <TableHead
              className={predictionTableHeadClass(predictionTableColumns.pool)}
            >
              Bolão
            </TableHead>
            {showParticipantColumn ? (
              <TableHead
                className={predictionTableHeadClass(
                  predictionTableColumns.participant,
                )}
              >
                Participante
              </TableHead>
            ) : null}
            <TableHead
              className={predictionTableHeadClass(
                `${predictionTableColumns.position} text-center`,
              )}
            >
              Posição
            </TableHead>
            <TableHead
              className={predictionTableHeadClass(
                `${predictionTableColumns.round} text-center`,
              )}
            >
              Rodada
            </TableHead>
            <TableHead
              className={predictionTableHeadClass(
                `${predictionTableColumns.result} text-center`,
              )}
            >
              Resultado Oficial
            </TableHead>
            <TableHead className={predictionTableHeadClass('w-[5rem] text-center')}>
              Palpite
            </TableHead>
            <TableHead
              className={predictionTableHeadClass(predictionTableColumns.player)}
            >
              Jogador
            </TableHead>
            <TableHead className={predictionTableHeadClass('w-[6.5rem]')}>Status</TableHead>
            <TableHead
              className={predictionTableHeadClass(
                `${predictionTableColumns.deadline} w-[5rem] text-center`,
              )}
            >
              Prazo
            </TableHead>
            <TableHead className={predictionTableHeadClass('w-[8.5rem] text-right')}>
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
              onViewAllPredictions={onViewAllPredictions}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
