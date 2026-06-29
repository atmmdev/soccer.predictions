'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createPoolSchema,
  type CreatePoolFormData,
} from '../schemas/create-pool.schema';

export function useCreatePool() {
  return useForm<CreatePoolFormData>({
    resolver: zodResolver(createPoolSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      championshipId: 0,
      active: true,
    },
  });
}
