import { z } from 'zod';

export const createChampionshipSchema = z.object({
  leagueId: z.number(),
  country: z.string({message: 'Selecione um país'}),
  season: z.number(),
  active: z.boolean(),
});

export type CreateChampionshipFormData = z.infer<
  typeof createChampionshipSchema
>;
