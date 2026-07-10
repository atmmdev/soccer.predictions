import { z } from 'zod';

import { isFullName } from '../utils/full-name';

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Informe seu nome')
      .refine(isFullName, {
        message: 'Informe nome e sobrenome',
      }),
    email: z.email('Informe um e-mail válido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirme sua senha'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
