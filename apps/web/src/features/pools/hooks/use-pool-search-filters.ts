'use client';

import { useMemo, useState } from 'react';

import type { Pool } from '../types/pool';

export function usePoolSearchFilters(items: Pool[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filteredPools = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter(pool => {
      const matchesSearch =
        query.length === 0 ||
        pool.name.toLowerCase().includes(query) ||
        pool.championshipName.toLowerCase().includes(query) ||
        pool.inviteCode.toLowerCase().includes(query);

      const matchesStatus =
        status === 'all' ||
        (status === 'active' && pool.status === 'ACTIVE') ||
        (status === 'inactive' && pool.status === 'INACTIVE');

      return matchesSearch && matchesStatus;
    });
  }, [items, search, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredPools,
  };
}
