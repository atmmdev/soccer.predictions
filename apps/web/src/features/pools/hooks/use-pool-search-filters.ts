'use client';

import { useCallback, useMemo, useState } from 'react';

import type { Pool } from '../types/pool';

const DEFAULT_STATUS = 'all';

export function usePoolSearchFilters(items: Pool[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const hasActiveFilters =
    search.trim().length > 0 || status !== DEFAULT_STATUS;

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus(DEFAULT_STATUS);
  }, []);

  const filteredPools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter(pool => {
      const matchesSearch =
        query.length === 0 ||
        pool.name.toLowerCase().includes(query) ||
        pool.championshipName.toLowerCase().includes(query);

      const matchesStatus =
        status === DEFAULT_STATUS ||
        (status === 'active' && pool.status === 'ACTIVE') ||
        (status === 'inactive' && pool.status === 'INACTIVE') ||
        (status === 'closed' && pool.status === 'CLOSED');

      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredPools,
    hasActiveFilters,
    clearFilters,
  };
}
