'use client';

import { rankingEntries } from '../mocks/ranking-entries';
import { useRankingSearchFilters } from './use-ranking-search-filters';

export function useRankingList() {
  const searchFilters = useRankingSearchFilters(rankingEntries);

  return { searchFilters };
}
