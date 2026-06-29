'use client';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

import { getFixtureLineup } from '../../mocks/fixture-lineups';
import { findPlayerInLineup } from '../../types/fixture-lineup';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import {
  canEditPrediction,
  getPredictionLockMessage,
} from '../../utils/prediction-window';
import { formatOfficialResult } from '../../utils/format-official-result';
import { PredictionMatchStatusBadge } from '../prediction-match-status-badge';

interface PredictionRowProps {
  fixture: PredictionFixtureItem;
  onEdit: (fixture: PredictionFixtureItem) => void;
}

function formatFixtureDate(date: string) {
  return format(parseISO(date), "dd/MM - HH:mm", { locale: ptBR });
}

function getSelectedPlayerName(fixture: PredictionFixtureItem) {
  if (!fixture.prediction?.selectedPlayerId) {
    return '—';
  }

  const lineup = getFixtureLineup(fixture.id);
  const selected = lineup
    ? findPlayerInLineup(lineup, fixture.prediction.selectedPlayerId)
    : null;

  return selected?.player.name ?? '—';
}

export function PredictionRow({ fixture, onEdit }: PredictionRowProps) {
  const editable = canEditPrediction(fixture);
  const hasPrediction = fixture.prediction !== null;
  const lockMessage = getPredictionLockMessage(fixture);

  function getActionLabel() {
    if (editable) {
      return hasPrediction ? 'Editar' : 'Palpitar';
    }

    if (hasPrediction) {
      return 'Ver';
    }

    return 'Encerrado';
  }

  return (
    <TableRow>
      <TableCell className='text-muted-foreground whitespace-nowrap text-xs'>
        {formatFixtureDate(fixture.date)}
      </TableCell>
      <TableCell className='text-xs'>
        <div className='flex flex-col gap-1'>
          <span className='font-medium'>{fixture.homeTeam}</span>
          <span className='font-medium'>{fixture.awayTeam}</span>
        </div>
      </TableCell>
      <TableCell className='text-muted-foreground text-xs'>
        {fixture.championshipName}
      </TableCell>
      <TableCell className='text-muted-foreground text-xs'>
        {fixture.poolName}
      </TableCell>
      <TableCell className='text-center'>
        <div className='flex justify-center'>
          <PositionBadge position={fixture.poolPosition} />
        </div>
      </TableCell>
      <TableCell className='text-center text-xs'>
        {fixture.round}
      </TableCell>
      <TableCell className='text-center text-xs font-medium'>
        {formatOfficialResult(fixture)}
      </TableCell>
      <TableCell className='text-center text-xs font-medium'>
        {hasPrediction
          ? `${fixture.prediction!.predictedHomeScore} x ${fixture.prediction!.predictedAwayScore}`
          : '—'}
      </TableCell>
      <TableCell className='text-xs'>
        {getSelectedPlayerName(fixture)}
      </TableCell>
      <TableCell>
        <PredictionMatchStatusBadge status={fixture.matchStatus} />
      </TableCell>
      <TableCell className='text-right'>
        <Button
          variant='outline'
          size='sm'
          disabled={!editable && !hasPrediction}
          title={lockMessage ?? undefined}
          onClick={() => onEdit(fixture)}
        >
          {getActionLabel()}
        </Button>
      </TableCell>
    </TableRow>
  );
}
