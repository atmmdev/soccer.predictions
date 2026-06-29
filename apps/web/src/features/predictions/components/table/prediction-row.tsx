'use client';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

import { getFixtureLineup } from '../../mocks/fixture-lineups';
import { findPlayerInLineup } from '../../types/fixture-lineup';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import { canEditPrediction } from '../../types/prediction-fixture';
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
      <TableCell className='text-center text-xs'>
        {fixture.round}
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
          disabled={!editable}
          onClick={() => onEdit(fixture)}
        >
          {hasPrediction ? 'Editar' : 'Palpitar'}
        </Button>
      </TableCell>
    </TableRow>
  );
}
