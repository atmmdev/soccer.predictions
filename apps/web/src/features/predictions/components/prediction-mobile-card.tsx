'use client';

import { Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { TableActionBadge } from '@/components/ui/table-action-badge';
import {
  FixtureScoreComparison,
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
  predictionActionTone,
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
  const actionTone = predictionActionTone[uiState];
  const actionLabel = fixture.isOwnPrediction
    ? getPredictionActionLabel(uiState, hasPrediction)
    : '—';
  const ActionIcon =
    canEdit && hasPrediction ? Pencil : canEdit ? Target : undefined;

  return (
    <article className='border-border space-y-3 rounded-lg border p-4 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0 space-y-1'>
          <p className='font-medium text-sm leading-snug'>
            {fixture.homeTeam}
            <span className='text-muted-foreground font-normal'> x </span>
            {fixture.awayTeam}
          </p>
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
      </dl>

      <div className='flex flex-wrap items-center justify-end gap-2'>
        <button
          type='button'
          className='text-primary text-xs hover:underline'
          onClick={() => onViewAllPredictions(fixture)}
        >
          Ver palpites
        </button>
        {fixture.isOwnPrediction ? (
          <TableActionBadge
            tone={actionTone}
            icon={ActionIcon}
            disabled={!canEdit}
            onClick={() => onPredict(fixture)}
          >
            {actionLabel}
          </TableActionBadge>
        ) : null}
      </div>
    </article>
  );
}
