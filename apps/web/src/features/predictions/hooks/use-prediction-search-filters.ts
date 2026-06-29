'use client';

import { useMemo, useState } from 'react';

import type { PredictionFixtureItem } from '../types/prediction-fixture';

export type PredictionFilterStatus = 'ALL' | 'PENDING' | 'SUBMITTED';

export function usePredictionSearchFilters(fixtures: PredictionFixtureItem[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PredictionFilterStatus>('ALL');
  const [poolName, setPoolName] = useState('ALL');

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
        poolName === 'ALL' || fixture.poolName === poolName;

      const matchesStatus =
        status === 'ALL' ||
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
  };
}
