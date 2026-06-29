import { z } from 'zod';

const baseScoringSchema = z.object({
  exactScore: z.number().min(0, 'Informe os pontos'),
  winnerScore: z.number().min(0, 'Informe os pontos'),
  loserScore: z.number().min(0, 'Informe os pontos'),
  correctWinner: z.number().min(0, 'Informe os pontos'),
  correctDraw: z.number().min(0, 'Informe os pontos'),
  playerGoal: z.number().min(0, 'Informe os pontos'),
  playerHatTrickMultiplier: z
    .number()
    .min(1, 'Multiplicador mínimo é 1'),
});

const cupPhaseRuleSchema = z.object({
  phase: z.enum([
    'GROUP',
    'ROUND_OF_32',
    'ROUND_OF_16',
    'QUARTER_FINAL',
    'SEMI_FINAL',
    'THIRD_PLACE',
    'FINAL',
  ]),
  label: z.string(),
  multiplier: z.number().min(1, 'Multiplicador mínimo é 1'),
});

export const createPoolSchema = z.object({
  name: z.string().min(3, 'Informe o nome do bolão'),
  championshipId: z.number().min(1, 'Selecione um campeonato'),
  baseScoring: baseScoringSchema,
  cupPhases: z.array(cupPhaseRuleSchema).nullable(),
  active: z.boolean(),
});

export type CreatePoolFormData = z.infer<typeof createPoolSchema>;
