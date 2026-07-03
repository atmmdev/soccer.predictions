'use client';

import { useCallback, useMemo, useState } from 'react';

import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { matchesFixtureDate } from '../utils/matches-fixture-date';

export type PredictionFilterStatus = 'ALL' | 'PENDING' | 'SUBMITTED';

const DEFAULT_STATUS: PredictionFilterStatus = 'ALL';
const DEFAULT_POOL = 'ALL';

interface UsePredictionSearchFiltersOptions {
  enableDateFilter?: boolean;
}

export function usePredictionSearchFilters(
  fixtures: PredictionFixtureItem[],
  options: UsePredictionSearchFiltersOptions = {},
) {
  const { enableDateFilter = false } = options;
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PredictionFilterStatus>(DEFAULT_STATUS);
  const [poolName, setPoolName] = useState(DEFAULT_POOL);
  const [selectedDate, setSelectedDate] = useState('');

  const hasActiveFilters =
    search.trim().length > 0 ||
    status !== DEFAULT_STATUS ||
    poolName !== DEFAULT_POOL ||
    (enableDateFilter && selectedDate.length > 0);

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus(DEFAULT_STATUS);
    setPoolName(DEFAULT_POOL);
    setSelectedDate('');
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

      const matchesDate =
        !enableDateFilter || matchesFixtureDate(fixture.date, selectedDate);

      return matchesSearch && matchesPool && matchesStatus && matchesDate;
    });
  }, [enableDateFilter, fixtures, poolName, search, selectedDate, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    poolName,
    setPoolName,
    selectedDate,
    setSelectedDate,
    enableDateFilter,
    poolOptions,
    filteredFixtures,
    hasActiveFilters,
    clearFilters,
  };
}
