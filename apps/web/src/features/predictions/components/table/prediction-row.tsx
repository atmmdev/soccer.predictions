'use client';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { TableActionBadge } from '@/components/ui/table-action-badge';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { TableCell, TableRow } from '@/components/ui/table';

import { PredictionCountdown } from '../prediction-countdown';
import { getFixtureLineup } from '../../mocks/fixture-lineups';
import { findPlayerInLineup } from '../../types/fixture-lineup';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import { formatOfficialResult } from '../../utils/format-official-result';
import {
  getPredictionActionLabel,
  getPredictionStatusLabel,
  getPredictionUiState,
  predictionActionTone,
  predictionStatusTone,
} from '../../utils/prediction-ui-state';
import { canEditPrediction } from '../../utils/prediction-window';

interface PredictionRowProps {
  fixture: PredictionFixtureItem;
  now: Date;
  onPredict: (fixture: PredictionFixtureItem) => void;
}

function formatFixtureDate(date: string) {
  return format(parseISO(date), 'dd/MM - HH:mm', { locale: ptBR });
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

export function PredictionRow({ fixture, now, onPredict }: PredictionRowProps) {
  const hasPrediction = fixture.prediction !== null;
  const uiState = getPredictionUiState(fixture, now);
  const canEdit = canEditPrediction(fixture, now);
  const statusTone = predictionStatusTone[uiState];
  const actionTone = predictionActionTone[uiState];
  const actionLabel = getPredictionActionLabel(uiState, hasPrediction);
  const ActionIcon = canEdit && hasPrediction ? Pencil : canEdit ? Target : undefined;

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
        <StatusBadge tone={statusTone}>
          {getPredictionStatusLabel(uiState)}
        </StatusBadge>
      </TableCell>
      <TableCell className='text-center'>
        <PredictionCountdown fixture={fixture} now={now} />
      </TableCell>
      <TableCell className='text-right'>
        <TableActionBadge
          tone={actionTone}
          icon={ActionIcon}
          disabled={!canEdit}
          onClick={() => onPredict(fixture)}
        >
          {actionLabel}
        </TableActionBadge>
      </TableCell>
    </TableRow>
  );
}
