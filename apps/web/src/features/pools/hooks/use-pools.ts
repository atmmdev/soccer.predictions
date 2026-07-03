'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { updateStoredUser } from '@/features/auth/lib/auth-storage';
import { getFetchErrorMessage } from '@/lib/api-client';

import { mapPoolResponse } from '../mappers/pool.mapper';
import type { CreatePoolFormData } from '../schemas/create-pool.schema';
import {
  createPoolRequest,
  fetchPoolsRequest,
} from '../services/pool-api.service';
import { mapFormToScoringConfig } from '../services/scoring-rules.mapper';
import type { Pool } from '../types/pool';

export function usePools() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPools = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchPoolsRequest();
      setPools(response.map(mapPoolResponse));
    } catch (loadError) {
      setError(
        getFetchErrorMessage(loadError, 'Não foi possível carregar os bolões.'),
      );
      setPools([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPools();
  }, [loadPools]);

  const createPool = useCallback(
    async (data: CreatePoolFormData): Promise<boolean> => {
      try {
        const response = await createPoolRequest({
          name: data.name.trim(),
          championshipId: data.championshipId,
          scoring: mapFormToScoringConfig(data),
        });

        updateStoredUser(response.user);
        setPools(current => [mapPoolResponse(response.pool), ...current]);
        return true;
      } catch (createError) {
        toast.error(
          getFetchErrorMessage(createError, 'Não foi possível criar o bolão.'),
        );
        return false;
      }
    },
    [],
  );

  return {
    pools,
    isLoading,
    error,
    reloadPools: loadPools,
    createPool,
  };
}
