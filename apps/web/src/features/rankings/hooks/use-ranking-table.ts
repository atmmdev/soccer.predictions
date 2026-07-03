'use client';

import { useMemo, useState } from 'react';

import type { RankingEntry } from '../types/ranking-entry';
import type { RankingStatKey } from '../constants/ranking-columns';
import { getRankingStatValue } from '../utils/ranking-stats';

export type RankingSortKey = 'name' | 'points' | RankingStatKey;

export type SortDirection = 'asc' | 'desc';

function compareEntries(
  a: RankingEntry,
  b: RankingEntry,
  sortKey: RankingSortKey,
): number {
  switch (sortKey) {
    case 'name':
      return a.name.localeCompare(b.name, 'pt-BR');
    case 'points':
      return a.points - b.points;
    default:
      return getRankingStatValue(a, sortKey) - getRankingStatValue(b, sortKey);
  }
}

export function useRankingTable(entries: RankingEntry[]) {
  const [sortKey, setSortKey] = useState<RankingSortKey>('points');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  const rows = useMemo(() => {
    const safeEntries = Array.isArray(entries) ? entries : [];

    return [...safeEntries].sort((a, b) => {
      const comparison = compareEntries(a, b, sortKey);

      return sortDir === 'asc' ? comparison : -comparison;
    });
  }, [entries, sortDir, sortKey]);

  function toggleSort(key: RankingSortKey) {
    if (sortKey === key) {
      setSortDir(current => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDir(key === 'name' ? 'asc' : 'desc');
  }

  return {
    rows,
    sortKey,
    sortDir,
    toggleSort,
  };
}
