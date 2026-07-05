'use client';

import { useEffect, useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ScoreStack,
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

import { fetchPredictionsByFixtureRequest } from '../../services/prediction-api.service';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';

interface FixturePredictionsDialogProps {
  fixture: PredictionFixtureItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getSelectedPlayerLabel(fixture: PredictionFixtureItem) {
  if (!fixture.prediction?.selectedPlayerId) {
    return '—';
  }

  return `Jogador #${fixture.prediction.selectedPlayerId}`;
}

function shouldShowVisibilityNotice(rows: PredictionFixtureItem[]) {
  return rows.some(row => !row.isOwnPrediction && row.prediction === null);
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

  const officialScores = fixture
    ? getOfficialScoresFromFixture(fixture)
    : null;
  const hasOfficial =
    officialScores !== null && hasCompleteScore(officialScores);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>
            {fixture
              ? `${fixture.homeTeam} x ${fixture.awayTeam}`
              : 'Palpites do jogo'}
          </DialogTitle>
          {fixture ? (
            <DialogDescription>
              {fixture.poolName} · Rodada {fixture.round}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {isLoading ? (
          <p className='text-muted-foreground py-8 text-center text-sm'>
            Carregando palpites...
          </p>
        ) : error ? (
          <p className='text-destructive py-8 text-center text-sm'>{error}</p>
        ) : rows.length === 0 ? (
          <p className='text-muted-foreground py-8 text-center text-sm'>
            Nenhum participante encontrado neste bolão.
          </p>
        ) : (
          <div className='space-y-4'>
            {shouldShowVisibilityNotice(rows) ? (
              <Alert>
                <AlertDescription>
                  Os palpites dos outros participantes ficam visíveis após o jogo
                  encerrar e o bolão ser fechado.
                </AlertDescription>
              </Alert>
            ) : null}

            {hasOfficial && officialScores ? (
              <div className='flex items-center justify-center gap-2 text-sm'>
                <span className='text-muted-foreground'>Resultado oficial:</span>
                <ScoreStack scores={officialScores} />
              </div>
            ) : null}

            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead className='text-muted-foreground text-xs'>
                      Participante
                    </TableHead>
                    <TableHead className='text-muted-foreground text-center text-xs'>
                      Posição
                    </TableHead>
                    <TableHead className='text-muted-foreground text-center text-xs'>
                      Palpite
                    </TableHead>
                    <TableHead className='text-muted-foreground text-xs'>
                      Jogador
                    </TableHead>
                    <TableHead className='text-muted-foreground text-center text-xs'>
                      Pontos
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

                    return (
                      <TableRow key={row.participantId}>
                        <TableCell className='text-xs font-medium'>
                          {row.participantName}
                          {row.isOwnPrediction ? (
                            <span className='text-muted-foreground ml-1 font-normal'>
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
                          {hasPrediction ? (
                            <ScoreStack scores={predictionScores} />
                          ) : (
                            <span className='text-muted-foreground text-xs'>
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className='text-muted-foreground text-xs'>
                          {getSelectedPlayerLabel(row)}
                        </TableCell>
                        <TableCell className='text-center text-xs font-medium'>
                          {row.earnedPoints ?? '—'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
