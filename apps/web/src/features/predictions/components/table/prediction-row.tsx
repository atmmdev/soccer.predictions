'use client';

import { Ban, Eye, Lock, Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { IconActionButton } from '@/components/ui/icon-action-button';
import {
  ScoreStack,
  PointsBadge,
  MatchTeamsStack,
  getOfficialScoresFromFixture,
  getPredictionScoresFromFixture,
  hasCompleteScore,
} from '@/components/matches';
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
  predictionStatusTone,
} from '../../utils/prediction-ui-state';
import { canEditPrediction } from '../../utils/prediction-window';
import { predictionTableColumns } from './prediction-table-columns';
import { formatFixtureRoundLabel } from '@/lib/format-fixture-round-label';

interface PredictionRowProps {
  fixture: PredictionFixtureItem;
  now: Date;
  showParticipantColumn: boolean;
  onPredict: (fixture: PredictionFixtureItem) => void;
  onViewAllPredictions: (fixture: PredictionFixtureItem) => void;
}

export function PredictionRow({
  fixture,
  now,
  showParticipantColumn,
  onPredict,
  onViewAllPredictions,
}: PredictionRowProps) {
  const hasPrediction = fixture.prediction !== null;
  const uiState = getPredictionUiState(fixture, now);
  const canEdit = fixture.isOwnPrediction && canEditPrediction(fixture, now);
  const statusTone = predictionStatusTone[uiState];
  const actionLabel = fixture.isOwnPrediction
    ? getPredictionActionLabel(uiState, hasPrediction)
    : '—';
  const officialScores = getOfficialScoresFromFixture(fixture);
  const predictionScores = getPredictionScoresFromFixture(fixture.prediction);
  const hasOfficial = hasCompleteScore(officialScores);
  const hasPredictionScores =
    predictionScores !== null && hasCompleteScore(predictionScores);

  return (
    <TableRow>
      <TableCell className={`${dateTimeTableCellClassName} text-center`}>
        <DateTimeDisplay value={fixture.date} />
      </TableCell>
      <TableCell className='max-w-[9rem] text-xs whitespace-normal xl:max-w-[10rem] 2xl:max-w-none'>
        <MatchTeamsStack
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          homeTeamLogo={fixture.homeTeamLogo}
          awayTeamLogo={fixture.awayTeamLogo}
        />
      </TableCell>
      <TableCell
        className={`text-muted-foreground max-w-[7rem] truncate text-center text-xs ${predictionTableColumns.championship}`}
        title={fixture.championshipName}
      >
        {fixture.championshipName}
      </TableCell>
      {showParticipantColumn ? (
        <TableCell
          className={`max-w-[7rem] truncate text-center text-xs font-medium ${predictionTableColumns.participant}`}
          title={fixture.participantName}
        >
          {fixture.participantName}
        </TableCell>
      ) : null}
      <TableCell
        className={`text-center text-xs ${predictionTableColumns.round}`}
      >
        {formatFixtureRoundLabel(fixture)}
      </TableCell>
      <TableCell className={`text-center ${predictionTableColumns.result}`}>
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
      <TableCell className='text-center'>
        <StatusBadge tone={statusTone}>
          {getPredictionStatusLabel(uiState)}
        </StatusBadge>
      </TableCell>
      <TableCell className={`text-center ${predictionTableColumns.points}`}>
        <div className='flex justify-center'>
          <PointsBadge
            points={hasPrediction ? fixture.earnedPoints : null}
            finished={fixture.matchStatus === 'FINISHED'}
          />
        </div>
      </TableCell>
      <TableCell className={`text-center ${predictionTableColumns.deadline}`}>
        <PredictionCountdown fixture={fixture} now={now} />
      </TableCell>
      <TableCell className='text-center'>
        <div className='flex items-center justify-center gap-0.5'>
          <IconActionButton
            label='Ver palpites'
            icon={Eye}
            tone='link'
            onClick={() => onViewAllPredictions(fixture)}
          />
          {fixture.isOwnPrediction ? (
            <IconActionButton
              label={actionLabel}
              icon={
                canEdit && hasPrediction
                  ? Pencil
                  : canEdit
                    ? Target
                    : uiState === 'FINISHED'
                      ? Lock
                      : Ban
              }
              tone={
                canEdit
                  ? hasPrediction
                    ? 'edit'
                    : 'success'
                  : uiState === 'FINISHED'
                    ? 'mute'
                    : 'danger'
              }
              disabled={!canEdit}
              onClick={() => onPredict(fixture)}
            />
          ) : null}
        </div>
      </TableCell>
    </TableRow>
  );
}
