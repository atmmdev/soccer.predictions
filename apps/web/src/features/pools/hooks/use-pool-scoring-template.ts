'use client';

import { useWatch, type UseFormReturn } from 'react-hook-form';

import { getScoringTemplateByChampionshipType } from '../mocks/scoring-templates';
import type { CreatePoolFormData } from '../schemas/create-pool.schema';
import { findChampionshipById } from '../services/championship-catalog.service';

export function usePoolScoringTemplate(
  form: UseFormReturn<CreatePoolFormData>,
) {
  const championshipId =
    useWatch({
      control: form.control,
      name: 'championshipId',
      defaultValue: 0,
    }) ?? 0;

  const championship =
    championshipId > 0 ? findChampionshipById(championshipId) : undefined;

  function applyTemplateForChampionship(nextChampionshipId: number) {
    const selectedChampionship = findChampionshipById(nextChampionshipId);

    if (!selectedChampionship) {
      return;
    }

    const template = getScoringTemplateByChampionshipType(
      selectedChampionship.type,
    );

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
