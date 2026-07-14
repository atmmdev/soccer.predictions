'use client';

import { useEffect, useMemo, useState } from 'react';

import type { RankingStatKey } from '../constants/ranking-columns';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../types/ranking-entry';
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

export function useRankingTable(
  entries: RankingEntry[],
  scoringRule: RankingScoringRuleFilter = 'ALL',
) {
  const [sortKey, setSortKey] = useState<RankingSortKey>('points');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  useEffect(() => {
    if (scoringRule === 'ALL') {
      setSortKey('points');
      setSortDir('desc');
      return;
    }

    setSortKey(scoringRule);
    setSortDir('desc');
  }, [scoringRule]);

  const rows = useMemo(() => {
    const safeEntries = Array.isArray(entries) ? entries : [];

    return [...safeEntries].sort((a, b) => {
      const comparison = compareEntries(a, b, sortKey);

      if (comparison !== 0) {
        return sortDir === 'asc' ? comparison : -comparison;
      }

      // Stable tie-breakers when sorting by a scoring rule column.
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      return a.name.localeCompare(b.name, 'pt-BR');
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
