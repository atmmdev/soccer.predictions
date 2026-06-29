'use client';

import { useMemo, useState } from 'react';

import type { Championship } from '../types/championship';

export function useChampionshipSearchFilters(items: Championship[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredChampionships = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter(championship => {
      const matchesSearch =
        query.length === 0 ||
        championship.name.toLowerCase().includes(query) ||
        championship.country.toLowerCase().includes(query);

      const matchesStatus =
        status === 'all' ||
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
  };
}
