'use client';

import { useMemo, useState } from 'react';

import type { Championship } from '../types/championship';

export type ChampionshipSortKey = 'name' | 'country' | 'season' | 'status';
export type SortDirection = 'asc' | 'desc';

export function useChampionshipTable(championships: Championship[]) {
  const [country, setCountry] = useState('all');
  const [season, setSeason] = useState('all');
  const [sortKey, setSortKey] = useState<ChampionshipSortKey>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

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
      const matchesCountry = country === 'all' || item.country === country;
      const matchesSeason =
        season === 'all' || item.season === Number(season);
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
  };
}
