'use client';

import { usePoolSearchFilters } from './use-pool-search-filters';
import { usePoolTable } from './use-pool-table';
import { usePools } from './use-pools';

export function usePoolList() {
  const {
    pools,
    isLoading,
    error,
    reloadPools,
    createPool,
    updatePool,
    updatePoolStatus,
  } = usePools();
  const searchFilters = usePoolSearchFilters(pools);
  const tableState = usePoolTable(searchFilters.filteredPools);

  return {
    pools,
    isLoading,
    error,
    reloadPools,
    createPool,
    updatePool,
    updatePoolStatus,
    searchFilters,
    tableState,
  };
}
