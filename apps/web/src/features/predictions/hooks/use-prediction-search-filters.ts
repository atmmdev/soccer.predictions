'use client';

import { useCallback, useMemo, useState } from 'react';

import type { PredictionFixtureItem } from '../types/prediction-fixture';

export type PredictionFilterStatus = 'ALL' | 'PENDING' | 'SUBMITTED';

const DEFAULT_STATUS: PredictionFilterStatus = 'ALL';
const DEFAULT_POOL = 'ALL';

export function usePredictionSearchFilters(fixtures: PredictionFixtureItem[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PredictionFilterStatus>(DEFAULT_STATUS);
  const [poolName, setPoolName] = useState(DEFAULT_POOL);

  const hasActiveFilters =
    search.trim().length > 0 ||
    status !== DEFAULT_STATUS ||
    poolName !== DEFAULT_POOL;

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus(DEFAULT_STATUS);
    setPoolName(DEFAULT_POOL);
  }, []);

  const poolOptions = useMemo(() => {
    const names = [...new Set(fixtures.map(fixture => fixture.poolName))];

    return names.sort();
  }, [fixtures]);

  const filteredFixtures = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return fixtures.filter(fixture => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        fixture.homeTeam.toLowerCase().includes(normalizedSearch) ||
        fixture.awayTeam.toLowerCase().includes(normalizedSearch) ||
        fixture.championshipName.toLowerCase().includes(normalizedSearch);

      const matchesPool =
        poolName === DEFAULT_POOL || fixture.poolName === poolName;

      const matchesStatus =
        status === DEFAULT_STATUS ||
        (status === 'PENDING' && fixture.prediction === null) ||
        (status === 'SUBMITTED' && fixture.prediction !== null);

      return matchesSearch && matchesPool && matchesStatus;
    });
  }, [fixtures, poolName, search, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    poolName,
    setPoolName,
    poolOptions,
    filteredFixtures,
    hasActiveFilters,
    clearFilters,
  };
}
