'use client';

import { useCallback, useMemo, useState } from 'react';

import { SCORING_ACHIEVEMENT_LABELS } from '../constants/scoring-rule-filters';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../types/ranking-entry';

const DEFAULT_POOL = '';
const DEFAULT_SCORING_RULE: RankingScoringRuleFilter = 'ALL';

export function useRankingSearchFilters(entries: RankingEntry[]) {
  const [search, setSearch] = useState('');
  const [poolName, setPoolName] = useState(DEFAULT_POOL);
  const [scoringRule, setScoringRule] =
    useState<RankingScoringRuleFilter>(DEFAULT_SCORING_RULE);

  const isPoolSelected = poolName.length > 0;

  const poolOptions = useMemo(() => {
    const names = [...new Set(entries.map(entry => entry.poolName))];

    return names.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [entries]);

  const hasActiveFilters =
    isPoolSelected ||
    search.trim().length > 0 ||
    scoringRule !== DEFAULT_SCORING_RULE;

  const clearFilters = useCallback(() => {
    setSearch('');
    setPoolName(DEFAULT_POOL);
    setScoringRule(DEFAULT_SCORING_RULE);
  }, []);

  const filteredEntries = useMemo(() => {
    if (!isPoolSelected) {
      return [];
    }

    const normalizedSearch = search.trim().toLowerCase();

    return entries.filter(entry => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        entry.name.toLowerCase().includes(normalizedSearch);

      const matchesPool = entry.poolName === poolName;

      return matchesSearch && matchesPool;
    });
  }, [entries, isPoolSelected, poolName, search]);

  const selectedChampionshipName = useMemo(() => {
    if (!isPoolSelected) {
      return null;
    }

    return (
      entries.find(entry => entry.poolName === poolName)?.championshipName ??
      null
    );
  }, [entries, isPoolSelected, poolName]);

  const activeScoringRuleLabel =
    scoringRule === 'ALL' ? null : SCORING_ACHIEVEMENT_LABELS[scoringRule];

  return {
    search,
    setSearch,
    poolName,
    setPoolName,
    scoringRule,
    setScoringRule,
    poolOptions,
    selectedChampionshipName,
    activeScoringRuleLabel,
    filteredEntries,
    isPoolSelected,
    hasActiveFilters,
    clearFilters,
  };
}
