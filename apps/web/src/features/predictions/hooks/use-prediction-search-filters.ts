'use client';

import { useCallback, useMemo, useState } from 'react';

import type {
  MatchStatus,
  PredictionFixtureItem,
} from '../types/prediction-fixture';
import { matchesFixtureDate } from '../utils/matches-fixture-date';

export type PredictionFilterStatus = 'ALL' | 'PENDING' | 'SUBMITTED';
export type PredictionMatchFilterStatus = 'ALL' | MatchStatus;

const DEFAULT_STATUS: PredictionFilterStatus = 'ALL';
const DEFAULT_MATCH_STATUS: PredictionMatchFilterStatus = 'ALL';
const DEFAULT_POOL = '';

interface UsePredictionSearchFiltersOptions {
  enableDateFilter?: boolean;
  enableParticipantFilter?: boolean;
}

export function usePredictionSearchFilters(
  fixtures: PredictionFixtureItem[],
  options: UsePredictionSearchFiltersOptions = {},
) {
  const { enableDateFilter = false, enableParticipantFilter = false } = options;
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<PredictionFilterStatus>(DEFAULT_STATUS);
  const [matchStatus, setMatchStatus] =
    useState<PredictionMatchFilterStatus>(DEFAULT_MATCH_STATUS);
  const [poolName, setPoolName] = useState(DEFAULT_POOL);
  const [selectedDate, setSelectedDate] = useState('');
  const [participantSearch, setParticipantSearch] = useState('');

  const isPoolSelected = poolName.length > 0;

  const hasActiveFilters =
    isPoolSelected ||
    search.trim().length > 0 ||
    status !== DEFAULT_STATUS ||
    matchStatus !== DEFAULT_MATCH_STATUS ||
    (enableDateFilter && selectedDate.length > 0) ||
    (enableParticipantFilter && participantSearch.trim().length > 0);

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus(DEFAULT_STATUS);
    setMatchStatus(DEFAULT_MATCH_STATUS);
    setPoolName(DEFAULT_POOL);
    setSelectedDate('');
    setParticipantSearch('');
  }, []);

  const poolOptions = useMemo(() => {
    const names = [...new Set(fixtures.map(fixture => fixture.poolName))];

    return names.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [fixtures]);

  const filteredFixtures = useMemo(() => {
    if (!isPoolSelected) {
      return [];
    }

    const normalizedSearch = search.trim().toLowerCase();
    const normalizedParticipant = participantSearch.trim().toLowerCase();

    return fixtures.filter(fixture => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        fixture.homeTeam.toLowerCase().includes(normalizedSearch) ||
        fixture.awayTeam.toLowerCase().includes(normalizedSearch) ||
        fixture.championshipName.toLowerCase().includes(normalizedSearch);

      const matchesParticipant =
        !enableParticipantFilter ||
        normalizedParticipant.length === 0 ||
        fixture.participantName.toLowerCase().includes(normalizedParticipant);

      const matchesPool = fixture.poolName === poolName;

      const matchesPredictionStatus =
        status === DEFAULT_STATUS ||
        (status === 'PENDING' && fixture.prediction === null) ||
        (status === 'SUBMITTED' && fixture.prediction !== null);

      const matchesMatchStatus =
        matchStatus === DEFAULT_MATCH_STATUS ||
        fixture.matchStatus === matchStatus;

      const matchesDate =
        !enableDateFilter || matchesFixtureDate(fixture.date, selectedDate);

      return (
        matchesSearch &&
        matchesParticipant &&
        matchesPool &&
        matchesPredictionStatus &&
        matchesMatchStatus &&
        matchesDate
      );
    });
  }, [
    enableDateFilter,
    enableParticipantFilter,
    fixtures,
    isPoolSelected,
    matchStatus,
    participantSearch,
    poolName,
    search,
    selectedDate,
    status,
  ]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    matchStatus,
    setMatchStatus,
    poolName,
    setPoolName,
    selectedDate,
    setSelectedDate,
    participantSearch,
    setParticipantSearch,
    enableDateFilter,
    enableParticipantFilter,
    poolOptions,
    filteredFixtures,
    isPoolSelected,
    hasActiveFilters,
    clearFilters,
  };
}
