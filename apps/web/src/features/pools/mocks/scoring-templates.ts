import type { Championship } from '@/features/championships/types/championship';

import type {
  BaseScoringRules,
  CupPhaseRule,
  PoolScoringConfig,
} from '../types/scoring-rules';

export const defaultBaseScoringRules: BaseScoringRules = {
  exactScore: 10,
  winnerScore: 6,
  loserScore: 4,
  correctWinner: 3,
  correctDraw: 3,
  playerGoal: 10,
  playerHatTrickMultiplier: 2,
};

export const defaultCupPhaseRules: CupPhaseRule[] = [
  { phase: 'GROUP', label: 'Fase de grupos', multiplier: 1 },
  { phase: 'ROUND_OF_32', label: '1/16 de final', multiplier: 2 },
  { phase: 'ROUND_OF_16', label: 'Oitavas de final', multiplier: 3 },
  { phase: 'QUARTER_FINAL', label: 'Quartas de final', multiplier: 4 },
  { phase: 'SEMI_FINAL', label: 'Semi-final', multiplier: 5 },
  { phase: 'THIRD_PLACE', label: 'Terceiro lugar', multiplier: 6 },
  { phase: 'FINAL', label: 'Final', multiplier: 6 },
];

export function getScoringTemplateByChampionshipType(
  type: Championship['type'],
): PoolScoringConfig {
  return {
    base: { ...defaultBaseScoringRules },
    cupPhases: type === 'CUP' ? defaultCupPhaseRules.map(phase => ({ ...phase })) : null,
  };
}
