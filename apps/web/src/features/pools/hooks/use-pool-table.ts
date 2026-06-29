'use client';

import { useMemo, useState } from 'react';

import type { Pool } from '../types/pool';

export type PoolSortKey =
  | 'name'
  | 'championshipName'
  | 'season'
  | 'participantsCount'
  | 'status';

export type SortDirection = 'asc' | 'desc';

export function usePoolTable(pools: Pool[]) {
  const [sortKey, setSortKey] = useState<PoolSortKey>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const rows = useMemo(() => {
    return [...pools].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'pt-BR');
          break;
        case 'championshipName':
          comparison = a.championshipName.localeCompare(b.championshipName, 'pt-BR');
          break;
        case 'season':
          comparison = a.season - b.season;
          break;
        case 'participantsCount':
          comparison = a.participantsCount - b.participantsCount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortDir === 'asc' ? comparison : -comparison;
    });
  }, [pools, sortKey, sortDir]);

  function toggleSort(key: PoolSortKey) {
    if (sortKey === key) {
      setSortDir(current => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDir('asc');
  }

  return {
    rows,
    sortKey,
    sortDir,
    toggleSort,
  };
}
