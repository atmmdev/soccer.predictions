'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  MatchTeamsInline,
  TeamCrest,
} from '@/components/matches';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getFetchErrorMessage } from '@/lib/api-client';
import { fetchFixtureLineupRequest } from '@/features/matches/services/match-api.service';

import { useSubmitPredictionForm } from '../../hooks/use-submit-prediction';
import type { SubmitPredictionFormData } from '../../schemas/submit-prediction.schema';
import type { FixtureLineup } from '../../types/fixture-lineup';
import type { PredictionFixtureItem } from '../../types/prediction-fixture';
import {
  canEditPrediction,
  getPredictionLockMessage,
} from '../../utils/prediction-window';
import { PlayerGoalPicker } from '../player-goal-picker';

interface SubmitPredictionDialogProps {
  fixture: PredictionFixtureItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    fixtureId: number,
    data: SubmitPredictionFormData,
  ) => boolean | Promise<boolean>;
}

export function SubmitPredictionDialog({
  fixture,
  open,
  onOpenChange,
  onSubmit,
}: SubmitPredictionDialogProps) {
  const form = useSubmitPredictionForm(fixture?.prediction);
  const [lineup, setLineup] = useState<FixtureLineup | null>(null);
  const [lineupError, setLineupError] = useState<string | null>(null);
  const [isLoadingLineup, setIsLoadingLineup] = useState(false);
  const isEditable = fixture ? canEditPrediction(fixture) : false;
  const lockMessage = fixture ? getPredictionLockMessage(fixture) : null;

  useEffect(() => {
    if (open && fixture) {
      form.reset({
        predictedHomeScore: fixture.prediction?.predictedHomeScore ?? 0,
        predictedAwayScore: fixture.prediction?.predictedAwayScore ?? 0,
        selectedPlayerId: fixture.prediction?.selectedPlayerId ?? null,
      });
    }
  }, [fixture, form, open]);

  useEffect(() => {
    if (!open || !fixture) {
      setLineup(null);
      setLineupError(null);
      return;
    }

    const fixtureId = fixture.id;
    let cancelled = false;

    async function loadLineup() {
      setIsLoadingLineup(true);
      setLineupError(null);

      try {
        const response = await fetchFixtureLineupRequest(fixtureId);

        if (!cancelled) {
          setLineup(response);
        }
      } catch (error) {
        if (!cancelled) {
          setLineup(null);
          setLineupError(
            getFetchErrorMessage(
              error,
              'Escalação indisponível para este jogo.',
            ),
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingLineup(false);
        }
      }
    }

    void loadLineup();

    return () => {
      cancelled = true;
    };
  }, [fixture, open]);

  async function handleSubmit(data: SubmitPredictionFormData) {
    if (!fixture) {
      return;
    }

    const saved = await onSubmit(fixture.id, data);

    if (!saved) {
      return;
    }

    toast.success('Palpite salvo com sucesso!');
    onOpenChange(false);
  }

  if (!fixture) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle>
            {!isEditable && fixture.prediction
              ? 'Visualizar palpite'
              : fixture.prediction
                ? 'Editar palpite'
                : 'Registrar palpite'}
          </DialogTitle>
        </DialogHeader>

        {lockMessage ? (
          <Alert>
            <AlertDescription>{lockMessage}</AlertDescription>
          </Alert>
        ) : null}

        <div className='space-y-1 rounded-lg border p-3'>
          <MatchTeamsInline
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeTeamLogo={fixture.homeTeamLogo}
            awayTeamLogo={fixture.awayTeamLogo}
            className='font-medium'
          />
          <p className='text-muted-foreground text-xs'>
            {fixture.championshipName} · {fixture.poolName} · Rodada{' '}
            {fixture.round}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'
          >
            <div className='grid grid-cols-2 gap-3'>
              <FormField
                control={form.control}
                name='predictedHomeScore'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <TeamCrest
                        name={fixture.homeTeam}
                        logo={fixture.homeTeamLogo}
                        size={16}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        className='h-11'
                        disabled={!isEditable}
                        value={field.value}
                        onChange={event =>
                          field.onChange(Number(event.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='predictedAwayScore'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <TeamCrest
                        name={fixture.awayTeam}
                        logo={fixture.awayTeamLogo}
                        size={16}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        className='h-11'
                        disabled={!isEditable}
                        value={field.value}
                        onChange={event =>
                          field.onChange(Number(event.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isLoadingLineup ? (
              <p className='text-muted-foreground text-sm'>
                Carregando escalação...
              </p>
            ) : lineupError ? (
              <Alert>
                <AlertDescription>{lineupError}</AlertDescription>
              </Alert>
            ) : lineup ? (
              <FormField
                control={form.control}
                name='selectedPlayerId'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PlayerGoalPicker
                        lineup={lineup}
                        value={field.value}
                        onChange={field.onChange}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
              >
                {isEditable ? 'Cancelar' : 'Fechar'}
              </Button>
              {isEditable ? (
                <Button type='submit'>Salvar palpite</Button>
              ) : null}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
