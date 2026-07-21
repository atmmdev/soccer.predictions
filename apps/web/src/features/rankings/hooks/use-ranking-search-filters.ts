'use client';

import { useCallback, useMemo, useState } from 'react';

import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../types/ranking-entry';

const DEFAULT_SCORING_RULE: RankingScoringRuleFilter = 'ALL';

export function useRankingSearchFilters(entries: RankingEntry[]) {
  const [search, setSearch] = useState('');
  const [scoringRule, setScoringRule] =
    useState<RankingScoringRuleFilter>(DEFAULT_SCORING_RULE);

  const hasActiveClientFilters =
    search.trim().length > 0 || scoringRule !== DEFAULT_SCORING_RULE;

  const clearClientFilters = useCallback(() => {
    setSearch('');
    setScoringRule(DEFAULT_SCORING_RULE);
  }, []);

  const filteredEntries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch.length === 0) {
      return entries;
    }

    return entries.filter(entry =>
      entry.name.toLowerCase().includes(normalizedSearch),
    );
  }, [entries, search]);

  return {
    search,
    setSearch,
    scoringRule,
    setScoringRule,
    filteredEntries,
    hasActiveClientFilters,
    clearClientFilters,
  };
}
