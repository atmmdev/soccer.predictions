'use client';

import { useCallback } from 'react';

import { useChampionshipSearchFilters } from './use-championship-search-filters';
import { useChampionshipTable } from './use-championship-table';
import { useChampionships } from './use-championships';

export function useChampionshipList() {
  const {
    championships,
    isLoading,
    error,
    reloadChampionships,
    createChampionship,
    syncChampionship,
    updateChampionshipStatus,
  } = useChampionships();
  const searchFilters = useChampionshipSearchFilters(championships);
  const tableState = useChampionshipTable(searchFilters.filteredChampionships);

  const hasActiveFilters =
    searchFilters.hasActiveFilters || tableState.hasActiveFilters;

  const clearFilters = useCallback(() => {
    searchFilters.clearFilters();
    tableState.clearFilters();
  }, [searchFilters, tableState]);

  return {
    championships,
    isLoading,
    error,
    reloadChampionships,
    createChampionship,
    syncChampionship,
    updateChampionshipStatus,
    searchFilters,
    tableState,
    hasActiveFilters,
    clearFilters,
  };
}
