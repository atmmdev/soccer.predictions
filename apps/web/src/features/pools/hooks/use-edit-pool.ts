'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createPoolSchema,
  type CreatePoolFormData,
} from '../schemas/create-pool.schema';
import type { Pool } from '../types/pool';

export function poolToFormValues(pool: Pool): CreatePoolFormData {
  return {
    name: pool.name,
    championshipId: pool.championshipId,
    baseScoring: { ...pool.scoring.base },
    cupPhases: pool.scoring.cupPhases
      ? pool.scoring.cupPhases.map(phase => ({ ...phase }))
      : null,
    active: pool.status === 'ACTIVE',
    delegateUserId: undefined,
  };
}

export function useEditPool(pool: Pool | null) {
  const form = useForm<CreatePoolFormData>({
    resolver: zodResolver(createPoolSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: pool ? poolToFormValues(pool) : undefined,
  });

  useEffect(() => {
    if (pool) {
      form.reset(poolToFormValues(pool));
    }
  }, [form, pool]);

  return form;
}
