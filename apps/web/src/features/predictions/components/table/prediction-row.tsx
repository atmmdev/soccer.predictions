'use client';

import { Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { TableActionBadge } from '@/components/ui/table-action-badge';
import {
  ScoreStack,
  getOfficialScoresFromFixture,
  getPredictionScoresFromFixture,
  hasCompleteScore,
} from '@/components/matches';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import {
  DateTimeDisplay,
  dateTimeTableCellClassName,
} from '@/components/ui/datetime-display';
import { TableCell, TableRow } from '@/components/ui/table';

import { PredictionCountdown } from '../prediction-countdown';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';
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

  return `Jogador #${fixture.prediction.selectedPlayerId}`;
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
  const officialScores = getOfficialScoresFromFixture(fixture);
  const predictionScores = getPredictionScoresFromFixture(fixture.prediction);
  const hasOfficial = hasCompleteScore(officialScores);
  const hasPredictionScores =
    predictionScores !== null && hasCompleteScore(predictionScores);

  return (
    <TableRow>
      <TableCell className={dateTimeTableCellClassName}>
        <DateTimeDisplay value={fixture.date} />
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
        className={`text-center ${predictionTableColumns.result}`}
      >
        <ScoreStack
          scores={officialScores}
          compareWith={hasPredictionScores ? predictionScores : undefined}
          highlight={hasOfficial && hasPredictionScores}
        />
      </TableCell>
      <TableCell className='text-center'>
        {hasPredictionScores ? (
          <ScoreStack
            scores={predictionScores}
            compareWith={hasOfficial ? officialScores : undefined}
            highlight={hasOfficial}
          />
        ) : (
          <span className='text-base font-bold text-muted-foreground'>—</span>
        )}
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
