import { parseISO, subMinutes } from 'date-fns';

import { PREDICTION_CUTOFF_MINUTES } from '../constants/prediction-cutoff';
import type { PredictionFixtureItem } from '../types/prediction-fixture';

export type PredictionWindowState = 'OPEN' | 'LOCKED_CUTOFF' | 'LOCKED_MATCH';

export function getPredictionDeadline(kickoffAt: string | Date): Date {
  const kickoff =
    typeof kickoffAt === 'string' ? parseISO(kickoffAt) : kickoffAt;

  return subMinutes(kickoff, PREDICTION_CUTOFF_MINUTES);
}

export function getPredictionWindowState(
  fixture: PredictionFixtureItem,
  now: Date = new Date(),
): PredictionWindowState {
  if (fixture.matchStatus !== 'SCHEDULED') {
    return 'LOCKED_MATCH';
  }

  const deadline = getPredictionDeadline(fixture.date);

  if (now >= deadline) {
    return 'LOCKED_CUTOFF';
  }

  return 'OPEN';
}

export function canEditPrediction(
  fixture: PredictionFixtureItem,
  now: Date = new Date(),
): boolean {
  return getPredictionWindowState(fixture, now) === 'OPEN';
}

export function getPredictionLockMessage(
  fixture: PredictionFixtureItem,
  now: Date = new Date(),
): string | null {
  const state = getPredictionWindowState(fixture, now);

  if (state === 'OPEN') {
    return null;
  }

  if (state === 'LOCKED_CUTOFF') {
    return `Palpites encerrados. O prazo fecha ${PREDICTION_CUTOFF_MINUTES} minutos antes do início do jogo.`;
  }

  if (fixture.matchStatus === 'LIVE') {
    return 'Partida em andamento. Não é possível alterar o palpite.';
  }

  return 'Partida encerrada. Não é possível alterar o palpite.';
}
