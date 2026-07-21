'use client';

import { useCallback } from 'react';

import { useRankingSearchFilters } from './use-ranking-search-filters';
import { useRankingTable } from './use-ranking-table';
import { useRankings } from './use-rankings';

export function useRankingList() {
  const {
    poolCatalog,
    entries,
    selectedPoolId,
    selectedRound,
    selectedChampionshipName,
    isLeague,
    availableRounds,
    isLoading,
    error,
    selectPool,
    selectRound,
    reloadRankings,
  } = useRankings();

  const {
    search,
    setSearch,
    scoringRule,
    setScoringRule,
    filteredEntries,
    hasActiveClientFilters,
    clearClientFilters,
  } = useRankingSearchFilters(entries);

  const tableState = useRankingTable(filteredEntries, scoringRule);

  const isPoolSelected = selectedPoolId !== null;

  const hasActiveFilters =
    isPoolSelected || selectedRound !== null || hasActiveClientFilters;

  const clearFilters = useCallback(() => {
    clearClientFilters();
    selectPool(null);
  }, [clearClientFilters, selectPool]);

  return {
    poolCatalog,
    selectedPoolId,
    selectedRound,
    selectedChampionshipName,
    isLeague,
    availableRounds,
    isPoolSelected,
    search,
    setSearch,
    scoringRule,
    setScoringRule,
    selectPool,
    selectRound,
    hasActiveFilters,
    clearFilters,
    tableState,
    isLoading,
    error,
    reloadRankings,
  };
}
