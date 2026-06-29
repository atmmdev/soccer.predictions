'use client';

import { useState } from 'react';

import { pools as initialPools } from '../mocks/pools';
import type { Pool } from '../types/pool';

export function usePools() {
  const [pools, setPools] = useState<Pool[]>(initialPools);

  return {
    pools,
    setPools,
  };
}
