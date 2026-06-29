'use client';

import { useCallback, useMemo, useState } from 'react';

import type { Championship } from '../types/championship';

const DEFAULT_STATUS = 'all';

export function useChampionshipSearchFilters(items: Championship[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(DEFAULT_STATUS);

  const hasActiveFilters =
    search.trim().length > 0 || status !== DEFAULT_STATUS;

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus(DEFAULT_STATUS);
  }, []);

  const filteredChampionships = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter(championship => {
      const matchesSearch =
        query.length === 0 ||
        championship.name.toLowerCase().includes(query) ||
        championship.country.toLowerCase().includes(query);

      const matchesStatus =
        status === DEFAULT_STATUS ||
        (status === 'active' && championship.status === 'ACTIVE') ||
        (status === 'inactive' && championship.status === 'INACTIVE');

      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredChampionships,
    hasActiveFilters,
    clearFilters,
  };
}
