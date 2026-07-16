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
} from '@/components/matches';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { getFetchErrorMessage } from '@/lib/api-client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
      <DialogContent className='w-fit max-w-[calc(100%-2rem)] overflow-visible sm:max-w-none'>
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
                className='flex items-center justify-center gap-3 text-base font-semibold'
                size={22}
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
        ) : (
          <div className='mx-auto w-fit max-w-full overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='text-muted-foreground min-w-[10rem] text-xs'>
                    Participante
                  </TableHead>
                  <TableHead className='text-muted-foreground px-4 text-center text-xs'>
                    Posição
                  </TableHead>
                  <TableHead className='text-muted-foreground px-4 text-center text-xs'>
                    Palpite
                  </TableHead>
                  <TableHead className='text-muted-foreground px-4 text-center text-xs'>
                    Pts
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(row => {
                  const predictionScores = getPredictionScoresFromFixture(
                    row.prediction,
                  );
                  const hasPrediction =
                    predictionScores !== null &&
                    hasCompleteScore(predictionScores);
                  const isHidden =
                    !othersVisible &&
                    !row.isOwnPrediction &&
                    row.prediction === null;

                  return (
                    <TableRow key={row.participantId}>
                      <TableCell className='max-w-[14rem] text-xs font-medium'>
                        <div className='flex items-center gap-2'>
                          <UserAvatar
                            name={row.participantName}
                            avatarDataUrl={row.participantAvatarDataUrl}
                            className='size-7'
                          />
                          <span className='truncate' title={row.participantName}>
                            {row.participantName}
                            {row.isOwnPrediction ? (
                              <span className='text-muted-foreground font-normal'>
                                {' '}
                                (você)
                              </span>
                            ) : null}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='flex justify-center'>
                          <PositionBadge position={row.poolPosition} />
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='flex justify-center'>
                          {isHidden ? (
                            <span className='text-muted-foreground text-xs'>
                              Oculto
                            </span>
                          ) : (
                            <ScoreStack
                              scores={
                                predictionScores ?? { home: null, away: null }
                              }
                              compareWith={
                                hasOfficial && hasPrediction
                                  ? officialScores
                                  : undefined
                              }
                              highlight={hasOfficial && hasPrediction}
                              homeTeam={fixture?.homeTeam}
                              awayTeam={fixture?.awayTeam}
                              homeTeamLogo={fixture?.homeTeamLogo}
                              awayTeamLogo={fixture?.awayTeamLogo}
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='flex justify-center'>
                          <PointsBadge
                            points={hasPrediction ? row.earnedPoints : null}
                            finished={row.matchStatus === 'FINISHED'}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
