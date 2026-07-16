'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getFetchErrorMessage } from '@/lib/api-client';

import {
  fetchDiscoverablePoolsRequest,
  requestPoolAccessRequest,
  type DiscoverablePoolResponse,
} from '../services/pool-api.service';
import type { DiscoverablePool } from '../types/pool';

function mapDiscoverablePool(
  pool: DiscoverablePoolResponse,
): DiscoverablePool {
  return {
    id: pool.id,
    name: pool.name,
    championshipName: pool.championshipName,
    championshipType: pool.championshipType,
    season: pool.season,
    participantsCount: pool.participantsCount,
    ownerId: pool.ownerId,
    ownerName: pool.ownerName,
    ownerAvatarDataUrl: pool.ownerAvatarDataUrl,
    status: pool.status,
    membershipStatus: pool.membershipStatus,
  };
}

export function useDiscoverablePools(enabled: boolean) {
  const [pools, setPools] = useState<DiscoverablePool[]>([]);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [requestingPoolId, setRequestingPoolId] = useState<number | null>(null);

  const loadPools = useCallback(async () => {
    if (!enabled) {
      setPools([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchDiscoverablePoolsRequest();
      setPools(response.map(mapDiscoverablePool));
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar os bolões disponíveis.',
        ),
      );
      setPools([]);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void loadPools();
  }, [loadPools]);

  const requestAccess = useCallback(async (poolId: number): Promise<boolean> => {
    setRequestingPoolId(poolId);

    try {
      const updated = await requestPoolAccessRequest(poolId);
      setPools(current =>
        current.map(pool =>
          pool.id === poolId ? mapDiscoverablePool(updated) : pool,
        ),
      );
      toast.success('Pedido de acesso enviado ao dono do bolão.');
      return true;
    } catch (requestError) {
      toast.error(
        getFetchErrorMessage(
          requestError,
          'Não foi possível solicitar acesso a este bolão.',
        ),
      );
      return false;
    } finally {
      setRequestingPoolId(null);
    }
  }, []);

  return {
    pools,
    isLoading,
    error,
    requestingPoolId,
    reloadPools: loadPools,
    requestAccess,
  };
}
