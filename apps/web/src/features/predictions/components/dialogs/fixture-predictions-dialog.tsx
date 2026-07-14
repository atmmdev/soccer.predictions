'use client';

import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

import { fetchPredictionsByFixtureRequest } from '../../services/prediction-api.service';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl overflow-visible sm:max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='pr-8 leading-snug'>
            {fixture ? (
              <MatchTeamsInline
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                homeTeamLogo={fixture.homeTeamLogo}
                awayTeamLogo={fixture.awayTeamLogo}
                className='text-base font-semibold'
                size={22}
              />
            ) : (
              'Palpites do jogo'
            )}
          </DialogTitle>
          {fixture ? (
            <DialogDescription>
              {fixture.poolName} · Rodada {fixture.round}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {isLoading ? (
          <PageLoading compact label='Carregando palpites...' />
        ) : error ? (
          <p className='text-destructive py-8 text-center text-sm'>{error}</p>
        ) : rows.length === 0 ? (
          <p className='text-muted-foreground py-8 text-center text-sm'>
            Nenhum participante encontrado neste bolão.
          </p>
        ) : (
          <div className='min-w-0 overflow-hidden [&_[data-slot=table-container]]:overflow-visible [&_[data-slot=table-head]]:px-1 [&_[data-slot=table-cell]]:px-1'>
            <Table className='table-fixed'>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='text-muted-foreground w-[34%] text-xs'>
                    Participante
                  </TableHead>
                  <TableHead className='text-muted-foreground w-[10%] text-center text-xs'>
                    Pos.
                  </TableHead>
                  <TableHead className='text-muted-foreground w-[14%] text-center text-xs leading-tight whitespace-normal'>
                    Resultado
                  </TableHead>
                  <TableHead className='text-muted-foreground w-[20%] text-center text-xs'>
                    Palpite
                  </TableHead>
                  <TableHead className='text-muted-foreground w-[12%] text-center text-xs'>
                    Pts
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(row => {
                  const rowOfficialScores = getOfficialScoresFromFixture(row);
                  const predictionScores = getPredictionScoresFromFixture(
                    row.prediction,
                  );
                  const hasPrediction =
                    predictionScores !== null &&
                    hasCompleteScore(predictionScores);
                  const rowHasOfficial = hasCompleteScore(rowOfficialScores);

                  return (
                    <TableRow key={row.participantId}>
                      <TableCell className='max-w-0 truncate text-xs font-medium'>
                        <span title={row.participantName}>
                          {row.participantName}
                        </span>
                        {row.isOwnPrediction ? (
                          <span className='text-muted-foreground font-normal'>
                            {' '}
                            (você)
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell className='text-center'>
                        <div className='flex justify-center'>
                          <PositionBadge position={row.poolPosition} />
                        </div>
                      </TableCell>
                      <TableCell className='text-center'>
                        <ScoreStack
                          scores={rowOfficialScores}
                          compareWith={
                            rowHasOfficial && hasPrediction
                              ? predictionScores
                              : undefined
                          }
                          highlight={rowHasOfficial && hasPrediction}
                        />
                      </TableCell>
                      <TableCell className='text-center'>
                        {hasPrediction ? (
                          <ScoreStack
                            scores={predictionScores}
                            compareWith={
                              rowHasOfficial ? rowOfficialScores : undefined
                            }
                            highlight={rowHasOfficial}
                          />
                        ) : (
                          <span className='text-base font-bold text-muted-foreground'>
                            —
                          </span>
                        )}
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
