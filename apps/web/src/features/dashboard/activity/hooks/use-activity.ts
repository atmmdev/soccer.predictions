'use client';

import { useCallback, useEffect, useState } from 'react';

import { getFetchErrorMessage } from '@/lib/api-client';

import { fetchActivityRequest } from '../services/activity-api.service';
import type { ActivityItem } from '../types/activity';

export function useActivity(limit = 10) {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchActivityRequest(limit);
      setItems(response);
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar a atividade recente.',
        ),
      );
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    void loadActivity();
  }, [loadActivity]);

  return {
    items,
    isLoading,
    error,
    reloadActivity: loadActivity,
  };
}
