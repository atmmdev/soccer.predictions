'use client';

import { Ban, Eye, Lock, Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { IconActionButton } from '@/components/ui/icon-action-button';
import {
  FixtureScoreComparison,
  MatchTeamsStack,
  PointsBadge,
  getOfficialScoresFromFixture,
  getPredictionScoresFromFixture,
} from '@/components/matches';

import {
  DateTimeDisplay,
} from '@/components/ui/datetime-display';

import { PredictionCountdown } from './prediction-countdown';
import type { PredictionFixtureItem } from '../types/prediction-fixture';
import {
  getPredictionActionLabel,
  getPredictionStatusLabel,
  getPredictionUiState,
  predictionStatusTone,
} from '../utils/prediction-ui-state';
import { canEditPrediction } from '../utils/prediction-window';

interface PredictionMobileCardProps {
  fixture: PredictionFixtureItem;
  now: Date;
  showParticipant: boolean;
  onPredict: (fixture: PredictionFixtureItem) => void;
  onViewAllPredictions: (fixture: PredictionFixtureItem) => void;
}

export function PredictionMobileCard({
  fixture,
  now,
  showParticipant,
  onPredict,
  onViewAllPredictions,
}: PredictionMobileCardProps) {
  const hasPrediction = fixture.prediction !== null;
  const uiState = getPredictionUiState(fixture, now);
  const canEdit =
    fixture.isOwnPrediction && canEditPrediction(fixture, now);
  const statusTone = predictionStatusTone[uiState];
  const actionLabel = fixture.isOwnPrediction
    ? getPredictionActionLabel(uiState, hasPrediction)
    : '—';

  return (
    <article className='border-border space-y-3 rounded-lg border p-4 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0 space-y-1'>
          <MatchTeamsStack
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeTeamLogo={fixture.homeTeamLogo}
            awayTeamLogo={fixture.awayTeamLogo}
            className='gap-1.5 text-sm'
          />
        </div>
        <StatusBadge tone={statusTone}>
          {getPredictionStatusLabel(uiState)}
        </StatusBadge>
      </div>

      <FixtureScoreComparison
        officialScores={getOfficialScoresFromFixture(fixture)}
        predictionScores={getPredictionScoresFromFixture(fixture.prediction)}
        predictionLabel={fixture.isOwnPrediction ? 'Meu Palpite' : 'Palpite'}
        className='border-border rounded-lg border px-4 py-3'
      />

      <dl className='grid grid-cols-2 gap-x-4 gap-y-2 text-xs'>
        <div>
          <dt className='text-muted-foreground'>Data</dt>
          <dd>
            <DateTimeDisplay value={fixture.date} />
          </dd>
        </div>
        <div>
          <dt className='text-muted-foreground'>Bolão</dt>
          <dd className='font-medium'>{fixture.poolName}</dd>
        </div>
        <div>
          <dt className='text-muted-foreground'>Rodada</dt>
          <dd className='font-medium'>{fixture.round}</dd>
        </div>
        {showParticipant ? (
          <div className='col-span-2'>
            <dt className='text-muted-foreground'>Participante</dt>
            <dd className='font-medium'>{fixture.participantName}</dd>
          </div>
        ) : null}
        <div>
          <dt className='text-muted-foreground'>Prazo</dt>
          <dd>
            <PredictionCountdown fixture={fixture} now={now} />
          </dd>
        </div>
        <div>
          <dt className='text-muted-foreground'>Pontos</dt>
          <dd>
            <PointsBadge
              points={hasPrediction ? fixture.earnedPoints : null}
              finished={fixture.matchStatus === 'FINISHED'}
            />
          </dd>
        </div>
      </dl>

      <div className='flex items-center justify-end gap-0.5'>
        <IconActionButton
          label='Ver palpites'
          tone='link'
          onClick={() => onViewAllPredictions(fixture)}
        >
          <Eye className='size-4' />
        </IconActionButton>
        {fixture.isOwnPrediction ? (
          <IconActionButton
            label={actionLabel}
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
          >
            {canEdit && hasPrediction ? (
              <Pencil className='size-4' />
            ) : canEdit ? (
              <Target className='size-4' />
            ) : uiState === 'FINISHED' ? (
              <Lock className='size-4' />
            ) : (
              <Ban className='size-4' />
            )}
          </IconActionButton>
        ) : null}
      </div>
    </article>
  );
}
