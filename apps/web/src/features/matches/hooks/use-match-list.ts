'use client';

import { useMatchSearchFilters } from './use-match-search-filters';
import { useMatches } from './use-matches';

export function useMatchList() {
  const { fixtures } = useMatches();
  const searchFilters = useMatchSearchFilters(fixtures);

  return { searchFilters };
}
