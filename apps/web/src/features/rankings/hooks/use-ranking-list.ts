'use client';

import { useRankingSearchFilters } from './use-ranking-search-filters';
import { useRankingTable } from './use-ranking-table';
import { useRankings } from './use-rankings';

export function useRankingList() {
  const { entries, isLoading, error, reloadRankings } = useRankings();
  const searchFilters = useRankingSearchFilters(entries);
  const tableState = useRankingTable(searchFilters.filteredEntries);

  return {
    searchFilters,
    tableState,
    isLoading,
    error,
    reloadRankings,
  };
}
