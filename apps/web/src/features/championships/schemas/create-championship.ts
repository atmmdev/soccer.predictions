import { z } from 'zod';

export const createChampionshipScheme = z.object({
  leagueId: z.number(),
  country: z.string(),
  season: z.number(),
  active: z.boolean(),
});

export type CreateChampionshipFormData = z.infer<
  typeof createChampionshipScheme
>;
