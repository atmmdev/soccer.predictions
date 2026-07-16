'use client';

import { useWatch, type UseFormReturn } from 'react-hook-form';

import type { Championship } from '@/features/championships/types/championship';

import { getScoringTemplateByChampionshipType } from '../mocks/scoring-templates';
import type { CreatePoolFormData } from '../schemas/create-pool.schema';

export function usePoolScoringTemplate(
  form: UseFormReturn<CreatePoolFormData>,
  championships: Championship[],
) {
  const championshipId =
    useWatch({
      control: form.control,
      name: 'championshipId',
      defaultValue: 0,
    }) ?? 0;

  const championship =
    championshipId > 0
      ? championships.find(item => item.id === championshipId)
      : undefined;

  function applyTemplateForChampionship(
    nextChampionshipId: number,
    championshipTypeOverride?: Championship['type'],
  ) {
    const selectedChampionship = championships.find(
      item => item.id === nextChampionshipId,
    );
    const type =
      championshipTypeOverride ?? selectedChampionship?.type;

    if (!type) {
      return;
    }

    const template = getScoringTemplateByChampionshipType(type);

    form.setValue('baseScoring', { ...template.base });
    form.setValue(
      'cupPhases',
      template.cupPhases
        ? template.cupPhases.map(phase => ({ ...phase }))
        : null,
    );
  }

  return {
    championship,
    championshipType: championship?.type,
    applyTemplateForChampionship,
  };
}
