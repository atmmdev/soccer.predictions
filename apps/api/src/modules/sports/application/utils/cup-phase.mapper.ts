import type { CupPhase } from '../../../../../generated/prisma/client.js';

export function mapStageToCupPhase(stage: string | null): CupPhase | null {
  if (!stage) {
    return null;
  }

  const normalized = stage.toUpperCase();

  if (normalized.includes('GROUP')) {
    return 'GROUP';
  }

  if (
    normalized.includes('LAST_32') ||
    normalized.includes('ROUND_OF_32') ||
    normalized.includes('1/16')
  ) {
    return 'ROUND_OF_32';
  }

  if (
    normalized.includes('LAST_16') ||
    normalized.includes('ROUND_OF_16') ||
    normalized.includes('1/8')
  ) {
    return 'ROUND_OF_16';
  }

  if (normalized.includes('QUARTER')) {
    return 'QUARTER_FINAL';
  }

  if (normalized.includes('SEMI')) {
    return 'SEMI_FINAL';
  }

  if (normalized.includes('THIRD') || normalized.includes('PLAYOFF')) {
    return 'THIRD_PLACE';
  }

  if (normalized === 'FINAL' || normalized.endsWith('_FINAL')) {
    return 'FINAL';
  }

  return null;
}

/** @deprecated Prefer mapStageToCupPhase for football-data.org */
export function mapRoundToCupPhase(round: string | null): CupPhase | null {
  return mapStageToCupPhase(round);
}
