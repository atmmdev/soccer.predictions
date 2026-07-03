'use client';

import { useEffect, useState } from 'react';

import { getFetchErrorMessage } from '@/lib/api-client';

import {
  fetchPoolDelegatesRequest,
  type PoolDelegateCandidate,
} from '../services/user-api.service';

export function usePoolDelegates(enabled: boolean) {
  const [delegates, setDelegates] = useState<PoolDelegateCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setDelegates([]);
      setError(null);
      return;
    }

    let cancelled = false;

    async function loadDelegates() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchPoolDelegatesRequest();

        if (!cancelled) {
          setDelegates(response);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            getFetchErrorMessage(
              loadError,
              'Não foi possível carregar os participantes.',
            ),
          );
          setDelegates([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadDelegates();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { delegates, isLoading, error };
}
