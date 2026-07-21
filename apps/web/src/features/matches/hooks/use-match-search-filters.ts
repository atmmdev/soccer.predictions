'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

import {
  listDistinctRounds,
  resolveCurrentLeagueRound,
} from '@/lib/league-rounds';

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
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const championshipOptions = useMemo(() => {
    const names = [...new Set(fixtures.map(fixture => fixture.championshipName))];

    return names.sort((left, right) => left.localeCompare(right, 'pt-BR'));
  }, [fixtures]);

  const selectedChampionshipFixtures = useMemo(() => {
    if (championshipName === DEFAULT_CHAMPIONSHIP) {
      return [];
    }

    return fixtures.filter(
      fixture => fixture.championshipName === championshipName,
    );
  }, [championshipName, fixtures]);

  const isLeagueChampionship =
    selectedChampionshipFixtures.length > 0 &&
    selectedChampionshipFixtures.every(
      fixture => fixture.championshipType === 'LEAGUE',
    );

  const availableRounds = useMemo(
    () =>
      isLeagueChampionship
        ? listDistinctRounds(selectedChampionshipFixtures)
        : [],
    [isLeagueChampionship, selectedChampionshipFixtures],
  );

  const currentRound = useMemo(
    () =>
      isLeagueChampionship
        ? resolveCurrentLeagueRound(selectedChampionshipFixtures)
        : null,
    [isLeagueChampionship, selectedChampionshipFixtures],
  );

  useEffect(() => {
    if (!isLeagueChampionship) {
      setSelectedRound(null);
      return;
    }

    setSelectedRound(previous => {
      if (previous !== null && availableRounds.includes(previous)) {
        return previous;
      }

      return currentRound ?? availableRounds[0] ?? null;
    });
  }, [availableRounds, currentRound, isLeagueChampionship]);

  const handleChampionshipNameChange = useCallback((value: string) => {
    setChampionshipName(value);
    setSelectedRound(null);
  }, []);

  const isRoundFilterActive =
    isLeagueChampionship &&
    selectedRound !== null &&
    currentRound !== null &&
    selectedRound !== currentRound;

  const hasActiveFilters =
    search.trim().length > 0 ||
    status !== DEFAULT_STATUS ||
    championshipName !== DEFAULT_CHAMPIONSHIP ||
    isRoundFilterActive ||
    dateFrom.length > 0 ||
    dateTo.length > 0;

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus(DEFAULT_STATUS);
    setChampionshipName(DEFAULT_CHAMPIONSHIP);
    setSelectedRound(null);
    setDateFrom('');
    setDateTo('');
  }, []);

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

      const matchesRound =
        !isLeagueChampionship ||
        selectedRound === null ||
        fixture.round === selectedRound;

      return (
        matchesSearch &&
        matchesChampionship &&
        matchesStatus &&
        matchesDate &&
        matchesRound
      );
    });
  }, [
    championshipName,
    dateFrom,
    dateTo,
    fixtures,
    isLeagueChampionship,
    search,
    selectedRound,
    status,
  ]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    championshipName,
    setChampionshipName: handleChampionshipNameChange,
    selectedRound,
    setSelectedRound,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    championshipOptions,
    availableRounds,
    currentRound,
    isLeagueChampionship,
    filteredFixtures,
    hasActiveFilters,
    clearFilters,
  };
}
