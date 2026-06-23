import { z } from 'zod';

export const createChampionshipScheme = z.object({
  leagueId: z.number(),
  season: z.number(),
  active: z.boolean(),
})