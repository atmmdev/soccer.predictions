'use client';

import { useMemo, useState } from 'react';
import type { Championship } from '../types/championship';
import { championships as defaultChampionships } from '../mocks/championships';

export function useChampionshipFilters(
  items: Championship[] = defaultChampionships,
) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredChampionships = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter(championships => {
      const matchesSearch =
        query.length === 0 ||
        championships.name.toLowerCase().includes(query) ||
        championships.country.toLowerCase().includes(query);
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && championships.status === 'ACTIVE') ||
        (status === 'inactive' && championships.status === 'INACTIVE');
      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredChampionships
  };
}
