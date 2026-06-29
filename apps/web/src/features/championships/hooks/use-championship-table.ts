'use client';

import { useCallback, useMemo, useState } from 'react';

import type { Championship } from '../types/championship';

export type ChampionshipSortKey = 'name' | 'country' | 'season' | 'status';
export type SortDirection = 'asc' | 'desc';

const DEFAULT_COUNTRY = 'all';
const DEFAULT_SEASON = 'all';

export function useChampionshipTable(championships: Championship[]) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [season, setSeason] = useState(DEFAULT_SEASON);
  const [sortKey, setSortKey] = useState<ChampionshipSortKey>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const hasActiveFilters =
    country !== DEFAULT_COUNTRY || season !== DEFAULT_SEASON;

  const clearFilters = useCallback(() => {
    setCountry(DEFAULT_COUNTRY);
    setSeason(DEFAULT_SEASON);
  }, []);

  const countries = useMemo(
    () => [...new Set(championships.map(item => item.country))].sort(),
    [championships],
  );

  const seasons = useMemo(
    () =>
      [...new Set(championships.map(item => item.season))].sort(
        (a, b) => b - a,
      ),
    [championships],
  );

  const rows = useMemo(() => {
    const filtered = championships.filter(item => {
      const matchesCountry =
        country === DEFAULT_COUNTRY || item.country === country;
      const matchesSeason =
        season === DEFAULT_SEASON || item.season === Number(season);
      return matchesCountry && matchesSeason;
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'pt-BR');
          break;
        case 'country':
          comparison = a.country.localeCompare(b.country, 'pt-BR');
          break;
        case 'season':
          comparison = a.season - b.season;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortDir === 'asc' ? comparison : -comparison;
    });
  }, [championships, country, season, sortKey, sortDir]);

  function toggleSort(key: ChampionshipSortKey) {
    if (sortKey === key) {
      setSortDir(current => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDir('asc');
  }

  return {
    rows,
    countries,
    seasons,
    country,
    setCountry,
    season,
    setSeason,
    sortKey,
    sortDir,
    toggleSort,
    hasActiveFilters,
    clearFilters,
  };
}
