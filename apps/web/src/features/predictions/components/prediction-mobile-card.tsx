'use client';

import { Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { TableActionBadge } from '@/components/ui/table-action-badge';

import { PredictionCountdown } from './prediction-countdown';
import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { formatOfficialResult } from '../utils/format-official-result';
import {
  formatFixtureDate,
  formatFixtureTime,
} from '../utils/format-fixture-datetime';
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
}

export function PredictionMobileCard({
  fixture,
  now,
  showParticipant,
  onPredict,
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

      <dl className='grid grid-cols-2 gap-x-4 gap-y-2 text-xs'>
        <div>
          <dt className='text-muted-foreground'>Data - Hora</dt>
          <dd className='font-medium'>{formatFixtureDate(fixture.date)} - {formatFixtureTime(fixture.date)}</dd>
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
          <dt className='text-muted-foreground'>Resultado</dt>
          <dd className='font-medium'>{formatOfficialResult(fixture)}</dd>
        </div>
        <div>
          <dt className='text-muted-foreground'>Palpite</dt>
          <dd className='font-medium'>
            {hasPrediction
              ? `${fixture.prediction!.predictedHomeScore} x ${fixture.prediction!.predictedAwayScore}`
              : '—'}
          </dd>
        </div>
        <div>
          <dt className='text-muted-foreground'>Prazo</dt>
          <dd>
            <PredictionCountdown fixture={fixture} now={now} />
          </dd>
        </div>
      </dl>

      {fixture.isOwnPrediction ? (
        <div className='flex justify-end'>
          <TableActionBadge
            tone={actionTone}
            icon={ActionIcon}
            disabled={!canEdit}
            onClick={() => onPredict(fixture)}
          >
            {actionLabel}
          </TableActionBadge>
        </div>
      ) : null}
    </article>
  );
}
