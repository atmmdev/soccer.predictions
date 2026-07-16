'use client';

import { useCallback, useEffect, useState } from 'react';

import { getFetchErrorMessage } from '@/lib/api-client';

import { fetchRankingsRequest } from '../services/ranking-api.service';
import type { RankingEntry } from '../types/ranking-entry';

export function useRankings() {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRankings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchRankingsRequest();
      setEntries(response);
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar a classificação.',
        ),
      );
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRankings();
  }, [loadRankings]);

  return {
    entries,
    isLoading,
    error,
    reloadRankings: loadRankings,
  };
}
