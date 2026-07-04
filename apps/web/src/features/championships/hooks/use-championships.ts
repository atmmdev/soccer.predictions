'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getFetchErrorMessage } from '@/lib/api-client';

import type { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import {
  fetchChampionshipsRequest,
  importChampionshipRequest,
  syncChampionshipRequest,
} from '../services/championship-api.service';
import type { Championship } from '../types/championship';

export function useChampionships() {
  const [championships, setChampionships] = useState<Championship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadChampionships = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchChampionshipsRequest();
      setChampionships(response);
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar os campeonatos.',
        ),
      );
      setChampionships([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadChampionships();
  }, [loadChampionships]);

  const createChampionship = useCallback(
    async (data: CreateChampionshipFormData): Promise<boolean> => {
      try {
        const created = await importChampionshipRequest(data);
        setChampionships(current => [created, ...current]);
        return true;
      } catch (createError) {
        toast.error(
          getFetchErrorMessage(
            createError,
            'Não foi possível importar o campeonato.',
          ),
        );
        return false;
      }
    },
    [],
  );

  const syncChampionship = useCallback(
    async (championshipId: number): Promise<boolean> => {
      try {
        const updated = await syncChampionshipRequest(championshipId);
        toast.success(
          updated > 0
            ? `${updated} jogo(s) atualizado(s).`
            : 'Nenhum jogo precisou ser atualizado.',
        );
        return true;
      } catch (syncError) {
        toast.error(
          getFetchErrorMessage(
            syncError,
            'Não foi possível sincronizar o campeonato.',
          ),
        );
        return false;
      }
    },
    [],
  );

  return {
    championships,
    isLoading,
    error,
    reloadChampionships: loadChampionships,
    createChampionship,
    syncChampionship,
  };
}
