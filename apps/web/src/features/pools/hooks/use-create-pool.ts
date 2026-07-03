'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getScoringTemplateByChampionshipType } from '../mocks/scoring-templates';
import {
  createPoolSchema,
  type CreatePoolFormData,
} from '../schemas/create-pool.schema';

const leagueTemplate = getScoringTemplateByChampionshipType('LEAGUE');

export function useCreatePool() {
  return useForm<CreatePoolFormData>({
    resolver: zodResolver(createPoolSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      championshipId: 0,
      baseScoring: { ...leagueTemplate.base },
      cupPhases: leagueTemplate.cupPhases,
      active: true,
      delegateUserId: undefined,
    },
  });
}
