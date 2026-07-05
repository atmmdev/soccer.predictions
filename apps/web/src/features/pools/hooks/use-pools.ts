'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getStoredUser, updateStoredUser } from '@/features/auth/lib/auth-storage';
import { getFetchErrorMessage } from '@/lib/api-client';

import { mapPoolResponse } from '../mappers/pool.mapper';
import type { CreatePoolFormData } from '../schemas/create-pool.schema';
import {
  createPoolRequest,
  fetchPoolsRequest,
  updatePoolStatusRequest,
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
        const isSuperAdmin = getStoredUser()?.role === 'SUPER_ADMIN';
        const response = await createPoolRequest({
          name: data.name.trim(),
          championshipId: data.championshipId,
          scoring: mapFormToScoringConfig(data),
          ...(isSuperAdmin && data.delegateUserId
            ? { delegateUserId: data.delegateUserId }
            : {}),
        });

        if (!isSuperAdmin) {
          updateStoredUser(response.user);
        }
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

  const updatePoolStatus = useCallback(
    async (
      poolId: number,
      status: Pool['status'],
    ): Promise<boolean> => {
      try {
        const updated = await updatePoolStatusRequest(poolId, status);
        setPools(current =>
          current.map(pool =>
            pool.id === poolId ? mapPoolResponse(updated) : pool,
          ),
        );
        return true;
      } catch (updateError) {
        toast.error(
          getFetchErrorMessage(
            updateError,
            'Não foi possível atualizar o status do bolão.',
          ),
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
    updatePoolStatus,
  };
}
