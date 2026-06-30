'use client';

import { rankingEntries } from '../mocks/ranking-entries';
import { useRankingSearchFilters } from './use-ranking-search-filters';
import { useRankingTable } from './use-ranking-table';

export function useRankingList() {
  const searchFilters = useRankingSearchFilters(rankingEntries);
  const tableState = useRankingTable(searchFilters.filteredEntries);

  return { searchFilters, tableState };
}
