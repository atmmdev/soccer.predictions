'use client';

import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { CURRENT_SEASON } from '../mocks/seasons';
import type { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import { filterLeaguesByCountry } from '../services/league.service';

export function useImportChampionshipCascade(
  form: UseFormReturn<CreateChampionshipFormData>,
) {
  const selectedCountry = form.watch('country');

  const filteredLeagues = useMemo(
    () => filterLeaguesByCountry(selectedCountry),
    [selectedCountry],
  );

  function resetLeagueCascade() {
    form.setValue('leagueId', 0);
    form.setValue('season', CURRENT_SEASON);
    form.clearErrors(['country', 'leagueId']);
  }

  return {
    selectedCountry,
    filteredLeagues,
    resetLeagueCascade,
  };
}
