'use client';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { TableActionBadge } from '@/components/ui/table-action-badge';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { TableCell, TableRow } from '@/components/ui/table';

import { getFixtureLineup } from '../../mocks/fixture-lineups';
import { findPlayerInLineup } from '../../types/fixture-lineup';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import { formatOfficialResult } from '../../utils/format-official-result';
import {
  getPredictionActionLabel,
  getPredictionStatusLabel,
  getPredictionUiState,
  predictionUiTone,
} from '../../utils/prediction-ui-state';

interface PredictionRowProps {
  fixture: PredictionFixtureItem;
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

export function PredictionRow({ fixture, onPredict }: PredictionRowProps) {
  const hasPrediction = fixture.prediction !== null;
  const uiState = getPredictionUiState(fixture);
  const isOpen = uiState === 'OPEN';
  const tone = predictionUiTone[uiState];
  const actionLabel = getPredictionActionLabel(uiState, hasPrediction);
  const ActionIcon = isOpen && hasPrediction ? Pencil : isOpen ? Target : undefined;

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
        <StatusBadge tone={tone}>
          {getPredictionStatusLabel(uiState)}
        </StatusBadge>
      </TableCell>
      <TableCell className='text-right'>
        <TableActionBadge
          tone={tone}
          icon={ActionIcon}
          disabled={!isOpen}
          onClick={() => onPredict(fixture)}
        >
          {actionLabel}
        </TableActionBadge>
      </TableCell>
    </TableRow>
  );
}
