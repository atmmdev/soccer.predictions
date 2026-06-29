import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { canEditPrediction } from './prediction-window';

export type PredictionUiState = 'OPEN' | 'BLOCKED' | 'FINISHED';

export function getPredictionUiState(
  fixture: PredictionFixtureItem,
  now: Date = new Date(),
): PredictionUiState {
  if (fixture.matchStatus === 'FINISHED') {
    return 'FINISHED';
  }

  if (canEditPrediction(fixture, now)) {
    return 'OPEN';
  }

  return 'BLOCKED';
}

export function getPredictionStatusLabel(state: PredictionUiState): string {
  switch (state) {
    case 'OPEN':
      return 'Ao vivo';
    case 'BLOCKED':
      return 'Bloqueado';
    case 'FINISHED':
      return 'Encerrado';
  }
}

export function getPredictionActionLabel(
  state: PredictionUiState,
  hasPrediction: boolean,
): string {
  if (state === 'OPEN') {
    return hasPrediction ? 'Editar' : 'Palpitar';
  }

  if (state === 'BLOCKED') {
    return 'Bloqueado';
  }

  return 'Encerrado';
}

export const predictionUiStateClassName: Record<PredictionUiState, string> = {
  OPEN: 'bg-green-100 text-green-800',
  BLOCKED: 'bg-red-400 text-white',
  FINISHED: 'bg-yellow-300 text-black',
};
