'use client';

import { useChampionshipSearchFilters } from './use-championship-search-filters';
import { useChampionshipTable } from './use-championship-table';
import { useChampionships } from './use-championships';

export function useChampionshipList() {
  const { championships, createChampionship } = useChampionships();
  const searchFilters = useChampionshipSearchFilters(championships);
  const tableState = useChampionshipTable(searchFilters.filteredChampionships);

  return {
    createChampionship,
    searchFilters,
    tableState,
  };
}
