import { PREDICTION_CUTOFF_MINUTES } from '../constants/prediction-cutoff';
import { getPredictionDeadline } from './prediction-window';

const COUNTDOWN_VISIBLE_MS = PREDICTION_CUTOFF_MINUTES * 60 * 1000;

export function getTimeToPredictionDeadlineMs(
  kickoffAt: string,
  now: Date = new Date(),
): number {
  const deadline = getPredictionDeadline(kickoffAt);

  return Math.max(0, deadline.getTime() - now.getTime());
}

/** Exibe o relógio apenas nos últimos 10 minutos do prazo para palpitar. */
export function shouldShowPredictionCountdown(
  kickoffAt: string,
  now: Date = new Date(),
): boolean {
  const timeToDeadline = getTimeToPredictionDeadlineMs(kickoffAt, now);

  return timeToDeadline > 0 && timeToDeadline <= COUNTDOWN_VISIBLE_MS;
}

export function formatPredictionCountdown(remainingMs: number): string {
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => value.toString().padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }

  return `${pad(minutes)}:${pad(seconds)}`;
}
