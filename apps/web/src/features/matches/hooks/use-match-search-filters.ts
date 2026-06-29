'use client';

import { useCallback, useMemo, useState } from 'react';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

import type { MatchFixtureItem, MatchStatus } from '../types/match-fixture';

export type MatchFilterStatus = 'ALL' | MatchStatus;

const DEFAULT_STATUS: MatchFilterStatus = 'ALL';
const DEFAULT_CHAMPIONSHIP = 'ALL';

function matchesDateRange(
  fixtureDate: string,
  dateFrom: string,
  dateTo: string,
): boolean {
  const kickoff = parseISO(fixtureDate);

  if (dateFrom) {
    const from = startOfDay(parseISO(dateFrom));

    if (kickoff < from) {
      return false;
    }
  }

  if (dateTo) {
    const to = endOfDay(parseISO(dateTo));

    if (kickoff > to) {
      return false;
    }
  }

  return true;
}

export function useMatchSearchFilters(fixtures: MatchFixtureItem[]) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<MatchFilterStatus>(DEFAULT_STATUS);
  const [championshipName, setChampionshipName] = useState(DEFAULT_CHAMPIONSHIP);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const hasActiveFilters =
    search.trim().length > 0 ||
    status !== DEFAULT_STATUS ||
    championshipName !== DEFAULT_CHAMPIONSHIP ||
    dateFrom.length > 0 ||
    dateTo.length > 0;

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus(DEFAULT_STATUS);
    setChampionshipName(DEFAULT_CHAMPIONSHIP);
    setDateFrom('');
    setDateTo('');
  }, []);

  const championshipOptions = useMemo(() => {
    const names = [...new Set(fixtures.map(fixture => fixture.championshipName))];

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

      const matchesChampionship =
        championshipName === DEFAULT_CHAMPIONSHIP ||
        fixture.championshipName === championshipName;

      const matchesStatus =
        status === DEFAULT_STATUS || fixture.status === status;

      const matchesDate = matchesDateRange(fixture.date, dateFrom, dateTo);

      return (
        matchesSearch &&
        matchesChampionship &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [championshipName, dateFrom, dateTo, fixtures, search, status]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    championshipName,
    setChampionshipName,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    championshipOptions,
    filteredFixtures,
    hasActiveFilters,
    clearFilters,
  };
}
