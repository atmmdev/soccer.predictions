'use client';

import { Ban, Eye, Lock, Pencil, Target } from 'lucide-react';

import { StatusBadge } from '@/components/ui/status-badge';
import { IconActionButton } from '@/components/ui/icon-action-button';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
  MatchTeamsInline,
  PointsBadge,
  TeamCrest,
  getOfficialScoresFromFixture,
  getPredictionScoresFromFixture,
  hasCompleteScore,
} from '@/components/matches';
import { DateTimeDisplay } from '@/components/ui/datetime-display';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatFixtureRoundLabel } from '@/lib/format-fixture-round-label';

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

function PredictionScoreInline({
  homeTeam,
  awayTeam,
  homeTeamLogo,
  awayTeamLogo,
  homeScore,
  awayScore,
  compareWith,
  highlight,
}: {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string | null;
  awayTeamLogo?: string | null;
  homeScore: number;
  awayScore: number;
  compareWith?: { home: number; away: number };
  highlight: boolean;
}) {
  return (
    <div className='flex items-center justify-center gap-4'>
      <span className='inline-flex items-center gap-1.5'>
        <TeamCrest
          name={homeTeam}
          logo={homeTeamLogo}
          size={18}
          showName={false}
        />
        <span
          className={cn(
            'text-base leading-none font-bold tabular-nums',
            highlight &&
              compareWith &&
              (homeScore === compareWith.home
                ? 'text-emerald-600'
                : 'text-red-500'),
          )}
        >
          {homeScore}
        </span>
      </span>
      <span className='inline-flex items-center gap-1.5'>
        <TeamCrest
          name={awayTeam}
          logo={awayTeamLogo}
          size={18}
          showName={false}
        />
        <span
          className={cn(
            'text-base leading-none font-bold tabular-nums',
            highlight &&
              compareWith &&
              (awayScore === compareWith.away
                ? 'text-emerald-600'
                : 'text-red-500'),
          )}
        >
          {awayScore}
        </span>
      </span>
    </div>
  );
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
    <article className='border-border space-y-4 rounded-lg border bg-card p-4 shadow-sm'>
      <div>
        <StatusBadge tone={statusTone}>
          {getPredictionStatusLabel(uiState)}
        </StatusBadge>
      </div>
      <div className='flex justify-center'>
        <MatchTeamsInline
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          homeTeamLogo={fixture.homeTeamLogo}
          awayTeamLogo={fixture.awayTeamLogo}
          homeScore={hasOfficial ? fixture.officialHomeScore : null}
          awayScore={hasOfficial ? fixture.officialAwayScore : null}
          className='justify-center'
          size={18}
        />
      </div>

      <div className='flex flex-col items-center gap-2 text-center'>
        <p className='text-muted-foreground text-xs font-medium'>
          {fixture.isOwnPrediction ? 'Meu Palpite' : 'Palpite'}
        </p>
        {hasPredictionScores ? (
          <PredictionScoreInline
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeTeamLogo={fixture.homeTeamLogo}
            awayTeamLogo={fixture.awayTeamLogo}
            homeScore={predictionScores.home}
            awayScore={predictionScores.away}
            compareWith={hasOfficial ? officialScores : undefined}
            highlight={hasOfficial}
          />
        ) : (
          <span className='text-base font-bold text-muted-foreground'>—</span>
        )}
      </div>

      <Separator />

      {showParticipant ? (
        <div className='flex items-center justify-center gap-2 text-xs'>
          <UserAvatar
            name={fixture.participantName}
            avatarDataUrl={fixture.participantAvatarDataUrl}
            className='size-7'
          />
          <span className='font-medium'>{fixture.participantName}</span>
        </div>
      ) : null}

      <div className='flex items-start justify-between gap-2 text-center text-xs'>
        <div className='min-w-0 flex-1 space-y-1'>
          <p className='text-muted-foreground'>Data</p>
          <DateTimeDisplay
            value={fixture.date}
            className='items-center text-foreground'
          />
        </div>
        <div className='min-w-0 flex-1 space-y-1'>
          <p className='text-muted-foreground'>Rodada</p>
          <p className='font-medium'>{formatFixtureRoundLabel(fixture)}</p>
        </div>
        <div className='min-w-0 flex-1 space-y-1'>
          <p className='text-muted-foreground'>Prazo</p>
          <div className='flex justify-center'>
            <PredictionCountdown fixture={fixture} now={now} />
          </div>
        </div>
        <div className='min-w-0 flex-1 space-y-1'>
          <p className='text-muted-foreground'>Pontos</p>
          <div className='flex justify-center'>
            <PointsBadge
              points={hasPrediction ? fixture.earnedPoints : null}
              finished={fixture.matchStatus === 'FINISHED'}
            />
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center gap-6'>
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
    </article>
  );
}
