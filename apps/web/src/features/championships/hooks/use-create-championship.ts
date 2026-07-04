'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createChampionshipSchema,
  CreateChampionshipFormData,
} from '../schemas/create-championship.schema';

export function useCreateChampionship() {
  return useForm<CreateChampionshipFormData>({
    resolver: zodResolver(createChampionshipSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',

    defaultValues: {
      season: new Date().getFullYear(),
      country: '',
      leagueId: 0,
      active: true,
    },
  });
}
