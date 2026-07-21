'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { getFetchErrorMessage } from '@/lib/api-client';

import {
  fetchRankingContextRequest,
  fetchRankingsRequest,
} from '../services/ranking-api.service';
import type {
  RankingContext,
  RankingEntry,
  RankingPoolOption,
} from '../types/ranking-entry';

function buildPoolCatalog(entries: RankingEntry[]): RankingPoolOption[] {
  const byId = new Map<number, string>();

  for (const entry of entries) {
    if (!byId.has(entry.poolId)) {
      byId.set(entry.poolId, entry.poolName);
    }
  }

  return [...byId.entries()]
    .map(([id, name]) => ({ id, name }))
    .sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'));
}

export function useRankings() {
  const [poolCatalog, setPoolCatalog] = useState<RankingPoolOption[]>([]);
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [context, setContext] = useState<RankingContext | null>(null);
  const [selectedPoolId, setSelectedPoolId] = useState<number | null>(null);
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCatalog = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchRankingsRequest();
      setPoolCatalog(buildPoolCatalog(response));
      setEntries([]);
      setContext(null);
      setSelectedPoolId(null);
      setSelectedRound(null);
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar a classificação.',
        ),
      );
      setPoolCatalog([]);
      setEntries([]);
      setContext(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPoolRankings = useCallback(
    async (poolId: number, round: number | null) => {
      setIsLoading(true);
      setError(null);

      try {
        const rankingResponse = await fetchRankingsRequest({
          poolId,
          round: round ?? undefined,
        });

        setEntries(rankingResponse);
        setSelectedPoolId(poolId);

        try {
          const contextResponse = await fetchRankingContextRequest(poolId);
          setContext(contextResponse);
          setSelectedRound(
            contextResponse.championshipType === 'LEAGUE' ? round : null,
          );
        } catch {
          const fallbackType = rankingResponse[0]?.championshipType;
          setContext(
            fallbackType
              ? {
                  poolId,
                  championshipType: fallbackType,
                  championshipName:
                    rankingResponse[0]?.championshipName ?? '',
                  rounds: [],
                }
              : null,
          );
          setSelectedRound(fallbackType === 'LEAGUE' ? round : null);
        }
      } catch (loadError) {
        setError(
          getFetchErrorMessage(
            loadError,
            'Não foi possível carregar a classificação.',
          ),
        );
        setEntries([]);
        setContext(null);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  const selectPool = useCallback(
    (poolId: number | null) => {
      if (poolId === null) {
        setSelectedPoolId(null);
        setSelectedRound(null);
        setContext(null);
        setEntries([]);
        return;
      }

      setSelectedPoolId(poolId);
      setSelectedRound(null);
      void loadPoolRankings(poolId, null);
    },
    [loadPoolRankings],
  );

  const selectRound = useCallback(
    (round: number | null) => {
      if (selectedPoolId === null) {
        return;
      }

      setSelectedRound(round);
      void loadPoolRankings(selectedPoolId, round);
    },
    [loadPoolRankings, selectedPoolId],
  );

  const reloadRankings = useCallback(async () => {
    if (selectedPoolId === null) {
      await loadCatalog();
      return;
    }

    await loadPoolRankings(selectedPoolId, selectedRound);
  }, [loadCatalog, loadPoolRankings, selectedPoolId, selectedRound]);

  const selectedChampionshipName = useMemo(() => {
    if (context?.championshipName) {
      return context.championshipName;
    }

    return entries[0]?.championshipName ?? null;
  }, [context?.championshipName, entries]);

  const isLeague =
    context?.championshipType === 'LEAGUE' ||
    entries[0]?.championshipType === 'LEAGUE';
  const availableRounds = context?.rounds ?? [];

  return {
    poolCatalog,
    entries,
    selectedPoolId,
    selectedRound,
    selectedChampionshipName,
    isLeague,
    availableRounds,
    isLoading,
    error,
    selectPool,
    selectRound,
    reloadRankings,
  };
}
