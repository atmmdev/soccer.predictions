'use client';

import { useCallback, useMemo, useState } from 'react';

import { SCORING_ACHIEVEMENT_LABELS } from '../constants/scoring-rule-filters';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../types/ranking-entry';
import {
  compareByScoringRule,
  matchesScoringRuleFilter,
} from '../utils/ranking-scoring';

const DEFAULT_POOL = 'ALL';
const DEFAULT_SCORING_RULE: RankingScoringRuleFilter = 'ALL';

export function useRankingSearchFilters(entries: RankingEntry[]) {
  const [search, setSearch] = useState('');
  const [poolName, setPoolName] = useState(DEFAULT_POOL);
  const [scoringRule, setScoringRule] =
    useState<RankingScoringRuleFilter>(DEFAULT_SCORING_RULE);

  const poolOptions = useMemo(() => {
    const names = [...new Set(entries.map(entry => entry.poolName))];

    return names.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [entries]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    poolName !== DEFAULT_POOL ||
    scoringRule !== DEFAULT_SCORING_RULE;

  const clearFilters = useCallback(() => {
    setSearch('');
    setPoolName(DEFAULT_POOL);
    setScoringRule(DEFAULT_SCORING_RULE);
  }, []);

  const filteredEntries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = entries.filter(entry => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        entry.name.toLowerCase().includes(normalizedSearch);

      const matchesPool =
        poolName === DEFAULT_POOL || entry.poolName === poolName;

      const matchesScoringRule = matchesScoringRuleFilter(entry, scoringRule);

      return matchesSearch && matchesPool && matchesScoringRule;
    });

    return [...filtered].sort((a, b) =>
      compareByScoringRule(a, b, scoringRule),
    );
  }, [entries, poolName, scoringRule, search]);

  const selectedChampionshipName = useMemo(() => {
    if (poolName === DEFAULT_POOL) {
      return null;
    }

    return (
      entries.find(entry => entry.poolName === poolName)?.championshipName ??
      null
    );
  }, [entries, poolName]);

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
    hasActiveFilters,
    clearFilters,
  };
}
