'use client';

import { useCallback, useEffect, useState } from 'react';

import { fetchActiveChampionshipsRequest } from '../services/championship-api.service';
import type { Championship } from '../types/championship';

export function useActiveChampionships() {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadChampionships = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetchActiveChampionshipsRequest();
      setChampionships(response);
    } catch {
      setChampionships([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadChampionships();
  }, [loadChampionships]);

  return { championships, isLoading, reloadChampionships: loadChampionships };
}
