import type { FixtureStatus } from '../../../../../generated/prisma/client.js';
import { PREDICTION_CUTOFF_MINUTES } from '../constants/prediction-cutoff.js';

function getPredictionDeadline(kickoffAt: Date): Date {
  return new Date(kickoffAt.getTime() - PREDICTION_CUTOFF_MINUTES * 60_000);
}

export function canEditPrediction(
  fixture: { date: Date; status: FixtureStatus },
  now: Date = new Date(),
): boolean {
  if (fixture.status !== 'SCHEDULED') {
    return false;
  }

  return now < getPredictionDeadline(fixture.date);
}

export function getPredictionLockMessage(
  fixture: { date: Date; status: FixtureStatus },
  now: Date = new Date(),
): string {
  if (fixture.status === 'LIVE') {
    return 'Partida em andamento. Não é possível alterar o palpite.';
  }

  if (fixture.status === 'FINISHED') {
    return 'Partida encerrada. Não é possível alterar o palpite.';
  }

  if (!canEditPrediction(fixture, now)) {
    return `Prazo encerrado. Palpites só podem ser enviados até ${PREDICTION_CUTOFF_MINUTES} minutos antes do jogo.`;
  }

  return '';
}
