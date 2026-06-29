import { z } from 'zod';

export const createPoolSchema = z.object({
  name: z.string().min(3, 'Informe o nome do bolão'),
  championshipId: z.number().min(1, 'Selecione um campeonato'),
  active: z.boolean(),
});

export type CreatePoolFormData = z.infer<typeof createPoolSchema>;
