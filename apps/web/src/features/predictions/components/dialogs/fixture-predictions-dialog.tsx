'use client';

import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  MatchTeamsInline,
  ScoreStack,
  PointsBadge,
  getOfficialScoresFromFixture,
  getPredictionScoresFromFixture,
  hasCompleteScore,
  type ScorePair,
} from '@/components/matches';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { getFetchErrorMessage } from '@/lib/api-client';
import { PageLoading } from '@/components/ui/page-loading';
import { UserAvatar } from '@/components/ui/user-avatar';
import { formatFixtureRoundLabel } from '@/lib/format-fixture-round-label';

import { PREDICTION_CUTOFF_MINUTES } from '../../constants/prediction-cutoff';
import { fetchPredictionsByFixtureRequest } from '../../services/prediction-api.service';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import { areOthersPredictionsVisible } from '../../utils/prediction-window';

interface FixturePredictionsDialogProps {
  fixture: PredictionFixtureItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getRowPredictionState(
  row: PredictionFixtureItem,
  othersVisible: boolean,
  officialScores: ScorePair,
  hasOfficial: boolean,
) {
  const predictionScores = getPredictionScoresFromFixture(row.prediction);
  const hasPrediction =
    predictionScores !== null && hasCompleteScore(predictionScores);
  const isHidden =
    !othersVisible && !row.isOwnPrediction && row.prediction === null;

  return {
    predictionScores,
    hasPrediction,
    isHidden,
    compareWith: hasOfficial && hasPrediction ? officialScores : undefined,
    highlight: hasOfficial && hasPrediction,
  };
}

function FixturePredictionRow({
  row,
  fixture,
  othersVisible,
  officialScores,
  hasOfficial,
}: {
  row: PredictionFixtureItem;
  fixture: PredictionFixtureItem;
  othersVisible: boolean;
  officialScores: ScorePair;
  hasOfficial: boolean;
}) {
  const state = getRowPredictionState(
    row,
    othersVisible,
    officialScores,
    hasOfficial,
  );

  return (
    <li className='flex items-center gap-2.5 py-3 sm:gap-3'>
      <div className='flex w-8 shrink-0 justify-center'>
        <PositionBadge position={row.poolPosition} />
      </div>

      <UserAvatar
        name={row.participantName}
        avatarDataUrl={row.participantAvatarDataUrl}
        className='size-8 shrink-0'
      />

      <p
        className='min-w-0 flex-1 truncate text-sm font-medium'
        title={row.participantName}
      >
        {row.participantName}
        {row.isOwnPrediction ? (
          <span className='text-muted-foreground font-normal'> (você)</span>
        ) : null}
      </p>

      <div className='flex shrink-0 justify-center px-1'>
        {state.isHidden ? (
          <span className='text-muted-foreground text-xs'>Oculto</span>
        ) : (
          <ScoreStack
            scores={state.predictionScores ?? { home: null, away: null }}
            compareWith={state.compareWith}
            highlight={state.highlight}
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeTeamLogo={fixture.homeTeamLogo}
            awayTeamLogo={fixture.awayTeamLogo}
          />
        )}
      </div>

      <div className='flex w-14 shrink-0 justify-end sm:w-16'>
        <PointsBadge
          points={state.hasPrediction ? row.earnedPoints : null}
          finished={row.matchStatus === 'FINISHED'}
        />
      </div>
    </li>
  );
}

function FixturePredictionsList({
  rows,
  fixture,
  othersVisible,
  officialScores,
  hasOfficial,
}: {
  rows: PredictionFixtureItem[];
  fixture: PredictionFixtureItem;
  othersVisible: boolean;
  officialScores: ScorePair;
  hasOfficial: boolean;
}) {
  return (
    <ul className='divide-border max-h-[min(60vh,28rem)] divide-y overflow-y-auto'>
      {rows.map(row => (
        <FixturePredictionRow
          key={row.participantId}
          row={row}
          fixture={fixture}
          othersVisible={othersVisible}
          officialScores={officialScores}
          hasOfficial={hasOfficial}
        />
      ))}
    </ul>
  );
}

export function FixturePredictionsDialog({
  fixture,
  open,
  onOpenChange,
}: FixturePredictionsDialogProps) {
  const [rows, setRows] = useState<PredictionFixtureItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const othersVisible = fixture
    ? areOthersPredictionsVisible(fixture)
    : false;

  useEffect(() => {
    if (!open || !fixture) {
      setRows([]);
      setError(null);
      return;
    }

    const { poolId, id: fixtureId } = fixture;
    let cancelled = false;

    async function loadPredictions() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchPredictionsByFixtureRequest(
          poolId,
          fixtureId,
        );

        if (!cancelled) {
          setRows(response);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            getFetchErrorMessage(
              loadError,
              'Não foi possível carregar os palpites deste jogo.',
            ),
          );
          setRows([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadPredictions();

    return () => {
      cancelled = true;
    };
  }, [fixture, open]);

  const officialScores = fixture
    ? getOfficialScoresFromFixture(fixture)
    : { home: null, away: null };
  const hasOfficial = hasCompleteScore(officialScores);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex max-h-[calc(100vh-2rem)] w-full max-w-[calc(100%-2rem)] flex-col gap-4 overflow-hidden sm:max-w-lg'>
        <DialogHeader className='gap-3 pr-8'>
          {fixture ? (
            <DialogDescription className='text-xs'>
              {fixture.poolName} · {formatFixtureRoundLabel(fixture)}
            </DialogDescription>
          ) : null}
          <DialogTitle className='leading-snug'>
            {fixture ? (
              <MatchTeamsInline
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                homeTeamLogo={fixture.homeTeamLogo}
                awayTeamLogo={fixture.awayTeamLogo}
                homeScore={fixture.officialHomeScore}
                awayScore={fixture.officialAwayScore}
                className='flex-nowrap! items-center justify-center gap-2 text-sm font-semibold sm:gap-3 sm:text-base'
                size={20}
              />
            ) : (
              'Palpites do jogo'
            )}
          </DialogTitle>
        </DialogHeader>

        {!othersVisible ? (
          <Alert>
            <AlertDescription>
              Os palpites dos demais participantes ficam ocultos até o prazo
              encerrar ({PREDICTION_CUTOFF_MINUTES} minutos antes do jogo). Você
              continua vendo o seu.
            </AlertDescription>
          </Alert>
        ) : null}

        {isLoading ? (
          <PageLoading compact label='Carregando palpites...' />
        ) : error ? (
          <p className='text-destructive py-8 text-center text-sm'>{error}</p>
        ) : rows.length === 0 ? (
          <p className='text-muted-foreground py-8 text-center text-sm'>
            Nenhum participante encontrado neste bolão.
          </p>
        ) : fixture ? (
          <FixturePredictionsList
            rows={rows}
            fixture={fixture}
            othersVisible={othersVisible}
            officialScores={officialScores}
            hasOfficial={hasOfficial}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
