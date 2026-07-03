'use client';

import { useCallback, useEffect, useState } from 'react';

import { getFetchErrorMessage } from '@/lib/api-client';

import { fetchFixturesRequest } from '../services/match-api.service';
import type { MatchFixtureItem } from '../types/match-fixture';

export function useMatches() {
  const [fixtures, setFixtures] = useState<MatchFixtureItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFixtures = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchFixturesRequest();
      setFixtures(response);
    } catch (loadError) {
      setError(
        getFetchErrorMessage(loadError, 'Não foi possível carregar os jogos.'),
      );
      setFixtures([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFixtures();
  }, [loadFixtures]);

  return {
    fixtures,
    isLoading,
    error,
    reloadFixtures: loadFixtures,
  };
}
