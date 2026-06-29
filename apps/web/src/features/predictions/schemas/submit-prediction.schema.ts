import { z } from 'zod';

export const submitPredictionSchema = z.object({
  predictedHomeScore: z.number().min(0, 'Informe o placar'),
  predictedAwayScore: z.number().min(0, 'Informe o placar'),
  selectedPlayerId: z
    .number()
    .nullable()
    .refine(value => value === null || value > 0, {
      message: 'Jogador inválido',
    }),
});

export type SubmitPredictionFormData = z.infer<typeof submitPredictionSchema>;
