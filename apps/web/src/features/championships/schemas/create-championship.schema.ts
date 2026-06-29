import { z } from 'zod';

export const createChampionshipSchema = z.object({
  country: z.string().min(1, 'Selecione um país'),
  leagueId: z.number().min(1, 'Selecione um campeonato'),
  season: z.number(),
  active: z.boolean(),
});

export type CreateChampionshipFormData = z.infer<
  typeof createChampionshipSchema
>;
