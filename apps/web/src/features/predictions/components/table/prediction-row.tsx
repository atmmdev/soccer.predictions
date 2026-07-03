'use client';

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
  formatFixtureDate,
  formatFixtureTime,
} from '../../utils/format-fixture-datetime';
import {
  getPredictionActionLabel,
  getPredictionStatusLabel,
  getPredictionUiState,
  predictionActionTone,
  predictionStatusTone,
} from '../../utils/prediction-ui-state';
import { canEditPrediction } from '../../utils/prediction-window';
import { predictionTableColumns } from './prediction-table-columns';

interface PredictionRowProps {
  fixture: PredictionFixtureItem;
  now: Date;
  showParticipantColumn: boolean;
  onPredict: (fixture: PredictionFixtureItem) => void;
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

export function PredictionRow({
  fixture,
  now,
  showParticipantColumn,
  onPredict,
}: PredictionRowProps) {
  const hasPrediction = fixture.prediction !== null;
  const uiState = getPredictionUiState(fixture, now);
  const canEdit =
    fixture.isOwnPrediction && canEditPrediction(fixture, now);
  const statusTone = predictionStatusTone[uiState];
  const actionTone = predictionActionTone[uiState];
  const actionLabel = fixture.isOwnPrediction
    ? getPredictionActionLabel(uiState, hasPrediction)
    : '—';
  const ActionIcon =
    canEdit && hasPrediction ? Pencil : canEdit ? Target : undefined;

  return (
    <TableRow>
      <TableCell className='flex flex-col gap-1 text-muted-foreground w-[6.5rem] truncate text-xs whitespace-nowrap'>
        <span>{formatFixtureDate(fixture.date)}</span>
        <span>{formatFixtureTime(fixture.date)}</span>
      </TableCell>
      <TableCell className='max-w-[9rem] text-xs whitespace-normal xl:max-w-[10rem] 2xl:max-w-none'>
        <div className='flex flex-col gap-1'>
          <span className='font-medium'>{fixture.homeTeam}</span>
          <span className='font-medium'>{fixture.awayTeam}</span>
        </div>
      </TableCell>
      <TableCell
        className={`text-muted-foreground max-w-[7rem] truncate text-xs ${predictionTableColumns.championship}`}
        title={fixture.championshipName}
      >
        {fixture.championshipName}
      </TableCell>
      <TableCell
        className={`text-muted-foreground max-w-[6rem] truncate text-xs ${predictionTableColumns.pool}`}
        title={fixture.poolName}
      >
        {fixture.poolName}
      </TableCell>
      {showParticipantColumn ? (
        <TableCell
          className={`max-w-[7rem] truncate text-xs font-medium ${predictionTableColumns.participant}`}
          title={fixture.participantName}
        >
          {fixture.participantName}
        </TableCell>
      ) : null}
      <TableCell className={`text-center ${predictionTableColumns.position}`}>
        <div className='flex justify-center'>
          <PositionBadge position={fixture.poolPosition} />
        </div>
      </TableCell>
      <TableCell
        className={`text-center text-xs ${predictionTableColumns.round}`}
      >
        {fixture.round}
      </TableCell>
      <TableCell
        className={`text-center text-xs font-medium ${predictionTableColumns.result}`}
      >
        {formatOfficialResult(fixture)}
      </TableCell>
      <TableCell className='text-center text-xs font-medium'>
        {hasPrediction
          ? `${fixture.prediction!.predictedHomeScore} x ${fixture.prediction!.predictedAwayScore}`
          : '—'}
      </TableCell>
      <TableCell className={`text-xs ${predictionTableColumns.player}`}>
        {getSelectedPlayerName(fixture)}
      </TableCell>
      <TableCell>
        <StatusBadge tone={statusTone}>
          {getPredictionStatusLabel(uiState)}
        </StatusBadge>
      </TableCell>
      <TableCell className={`text-center ${predictionTableColumns.deadline}`}>
        <PredictionCountdown fixture={fixture} now={now} />
      </TableCell>
      <TableCell className='text-right'>
        {fixture.isOwnPrediction ? (
          <TableActionBadge
            tone={actionTone}
            icon={ActionIcon}
            disabled={!canEdit}
            onClick={() => onPredict(fixture)}
          >
            {actionLabel}
          </TableActionBadge>
        ) : (
          <span className='text-muted-foreground text-xs'>—</span>
        )}
      </TableCell>
    </TableRow>
  );
}
