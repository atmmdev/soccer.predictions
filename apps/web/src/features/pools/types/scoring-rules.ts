export type CupPhase =
  | 'GROUP'
  | 'ROUND_OF_32'
  | 'ROUND_OF_16'
  | 'QUARTER_FINAL'
  | 'SEMI_FINAL'
  | 'THIRD_PLACE'
  | 'FINAL';

export interface BaseScoringRules {
  exactScore: number;
  winnerScore: number;
  loserScore: number;
  correctWinner: number;
  correctDraw: number;
  playerGoal: number;
  playerHatTrickMultiplier: number;
}

export interface CupPhaseRule {
  phase: CupPhase;
  label: string;
  multiplier: number;
}

export interface PoolScoringConfig {
  base: BaseScoringRules;
  cupPhases: CupPhaseRule[] | null;
}
