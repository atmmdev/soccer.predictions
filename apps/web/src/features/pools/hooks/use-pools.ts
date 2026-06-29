'use client';

import { useCallback, useState } from 'react';

import { pools as initialPools } from '../mocks/pools';
import type { CreatePoolFormData } from '../schemas/create-pool.schema';
import { getNextPoolId, PoolService } from '../services/pool.service';
import type { Pool } from '../types/pool';

export function usePools() {
  const [pools, setPools] = useState<Pool[]>(initialPools);

  const createPool = useCallback((data: CreatePoolFormData) => {
    setPools(current => {
      const pool = PoolService.create(data, getNextPoolId(current));
      return [...current, pool];
    });
  }, []);

  return {
    pools,
    createPool,
  };
}
