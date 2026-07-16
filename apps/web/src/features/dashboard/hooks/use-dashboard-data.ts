'use client';

import { Calendar, Target, Trophy, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { TbPercentage } from 'react-icons/tb';

import { usePredictions } from '@/features/predictions/hooks/use-predictions';
import { usePools } from '@/features/pools/hooks/use-pools';
import { useRankings } from '@/features/rankings/hooks/use-rankings';
import type { RankingEntry } from '@/features/rankings/types/ranking-entry';
import {
  compareFixturesForDashboard,
  isFixtureToday,
  isFixtureTomorrow,
  isFixtureUpcomingOrLive,
} from '@/lib/fixture-calendar';

import type { StatsItem } from '../stats/types/stats';
import { mapPredictionToDashboardMatch } from '../utils/map-prediction-to-match';
import type { Match } from '../matches/types/match';
import type { RankingUser } from '../rankings/types/ranking';

const TOP_RANKING_LIMIT = 10;
const ACTIVE_POOLS_LIMIT = 5;
const MATCHES_LIMIT = 10;

export interface RankingPoolOption {
  id: number;
  name: string;
}

function getPrimaryPoolId(entries: RankingEntry[]): number | null {
  const currentUserPool = entries.find(entry => entry.isCurrentUser);

  if (currentUserPool) {
    return currentUserPool.poolId;
  }

  return entries[0]?.poolId ?? null;
}

function toRankingPools(entries: RankingEntry[]): RankingPoolOption[] {
  const pools = new Map<number, string>();

  for (const entry of entries) {
    if (!pools.has(entry.poolId)) {
      pools.set(entry.poolId, entry.poolName);
    }
  }

  return [...pools.entries()]
    .map(([id, name]) => ({ id, name }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function toRankingUsers(entries: RankingEntry[]): RankingUser[] {
  return entries.map(entry => ({
    id: entry.id,
    name: entry.name,
    email: entry.email,
    points: entry.points,
  }));
}

export function useDashboardData() {
  const poolsState = usePools();
  const predictionsState = usePredictions();
  const rankingsState = useRankings();
  const [selectedPoolId, setSelectedPoolId] = useState<number | null>(null);

  const isLoading =
    poolsState.isLoading ||
    predictionsState.isLoading ||
    rankingsState.isLoading;

  const error =
    poolsState.error ?? predictionsState.error ?? rankingsState.error;

  const ownFixtures = useMemo(
    () => predictionsState.fixtures.filter(fixture => fixture.isOwnPrediction),
    [predictionsState.fixtures],
  );

  const rankingPools = useMemo(
    () => toRankingPools(rankingsState.entries),
    [rankingsState.entries],
  );

  const primaryPoolId = useMemo(
    () => getPrimaryPoolId(rankingsState.entries),
    [rankingsState.entries],
  );

  useEffect(() => {
    if (rankingPools.length === 0) {
      setSelectedPoolId(null);
      return;
    }

    const selectionStillValid =
      selectedPoolId !== null &&
      rankingPools.some(pool => pool.id === selectedPoolId);

    if (!selectionStillValid) {
      setSelectedPoolId(primaryPoolId ?? rankingPools[0].id);
    }
  }, [rankingPools, primaryPoolId, selectedPoolId]);

  const topRanking = useMemo(() => {
    if (selectedPoolId === null) {
      return [];
    }

    return toRankingUsers(
      rankingsState.entries
        .filter(entry => entry.poolId === selectedPoolId)
        .sort((left, right) => {
          if (right.points !== left.points) {
            return right.points - left.points;
          }

          return left.name.localeCompare(right.name);
        })
        .slice(0, TOP_RANKING_LIMIT),
    );
  }, [rankingsState.entries, selectedPoolId]);

  const activePools = useMemo(
    () =>
      [...poolsState.pools]
        .sort((left, right) => {
          if (right.predictionsCount !== left.predictionsCount) {
            return right.predictionsCount - left.predictionsCount;
          }

          return right.participantsCount - left.participantsCount;
        })
        .slice(0, ACTIVE_POOLS_LIMIT),
    [poolsState.pools],
  );

  const upcomingFixtures = useMemo(
    () => ownFixtures.filter(fixture => isFixtureUpcomingOrLive(fixture)),
    [ownFixtures],
  );

  const matchCounts = useMemo(() => {
    const live = ownFixtures.filter(
      fixture => fixture.matchStatus === 'LIVE',
    ).length;
    const today = ownFixtures.filter(fixture =>
      isFixtureToday(fixture.date),
    ).length;
    const tomorrow = ownFixtures.filter(fixture =>
      isFixtureTomorrow(fixture.date),
    ).length;

    return {
      all: upcomingFixtures.length,
      live,
      today,
      tomorrow,
    };
  }, [ownFixtures, upcomingFixtures]);

  const stats = useMemo((): StatsItem[] => {
    const activePoolCount = poolsState.pools.filter(
      pool => pool.status === 'ACTIVE',
    ).length;
    const participantsTotal = new Set(
      rankingsState.entries.map(entry => entry.id),
    ).size;
    const gamesToday = ownFixtures.filter(fixture =>
      isFixtureToday(fixture.date),
    ).length;
    const liveGames = ownFixtures.filter(
      fixture => fixture.matchStatus === 'LIVE',
    ).length;
    const registeredPredictions = ownFixtures.filter(
      fixture => fixture.prediction !== null,
    ).length;
    const finishedWithPrediction = ownFixtures.filter(
      fixture =>
        fixture.matchStatus === 'FINISHED' && fixture.prediction !== null,
    );
    const exactHits = finishedWithPrediction.filter(fixture => {
      const prediction = fixture.prediction;

      if (!prediction) {
        return false;
      }

      return (
        fixture.officialHomeScore !== null &&
        fixture.officialAwayScore !== null &&
        prediction.predictedHomeScore === fixture.officialHomeScore &&
        prediction.predictedAwayScore === fixture.officialAwayScore
      );
    }).length;
    const hitRate =
      finishedWithPrediction.length > 0
        ? Math.round((exactHits / finishedWithPrediction.length) * 100)
        : 0;

    return [
      {
        title: 'Total de Participantes',
        value: participantsTotal.toLocaleString('pt-BR'),
        trend: `Cadastrados no sistema`,
        icon: Users,
        iconBackground: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
      },
      {
        title: 'Bolões Ativos',
        value: activePoolCount.toLocaleString('pt-BR'),
        trend:
          activePoolCount === poolsState.pools.length
            ? 'Todos os seus bolões'
            : `${poolsState.pools.length - activePoolCount} inativo(s)`,
        icon: Trophy,
        iconBackground: 'bg-sky-100',
        iconColor: 'text-sky-600',
      },
      {
        title: 'Jogos Hoje',
        value: gamesToday.toLocaleString('pt-BR'),
        trend:
          liveGames > 0
            ? `${liveGames} em andamento`
            : 'Nenhum jogo ao vivo',
        icon: Calendar,
        iconBackground: 'bg-amber-100',
        iconColor: 'text-amber-600',
      },
      {
        title: 'Palpites Registrados',
        value: registeredPredictions.toLocaleString('pt-BR'),
        trend: `Boa sorte!`,
        trendPositive: registeredPredictions > 0,
        icon: Target,
        iconBackground: 'bg-violet-100',
        iconColor: 'text-violet-600',
      },
      {
        title: 'Média de Acertos',
        value: `${hitRate}%`,
        trend:
          finishedWithPrediction.length > 0
            ? `${exactHits} de ${finishedWithPrediction.length} placares exatos`
            : 'Sem jogos finalizados ainda',
        trendPositive: hitRate >= 50,
        icon: TbPercentage,
        iconBackground: 'bg-rose-100',
        iconColor: 'text-rose-600',
      },
    ];
  }, [ownFixtures, poolsState.pools, rankingsState.entries]);

  const filterMatches = (tab: 'all' | 'live' | 'today' | 'tomorrow'): Match[] => {
    const filtered = ownFixtures.filter(fixture => {
      if (tab === 'live') {
        return fixture.matchStatus === 'LIVE';
      }

      if (tab === 'today') {
        return isFixtureToday(fixture.date);
      }

      if (tab === 'tomorrow') {
        return isFixtureTomorrow(fixture.date);
      }

      return isFixtureUpcomingOrLive(fixture);
    });

    return filtered
      .sort(compareFixturesForDashboard)
      .slice(0, MATCHES_LIMIT)
      .map(mapPredictionToDashboardMatch);
  };

  return {
    isLoading,
    error,
    stats,
    topRanking,
    rankingPools,
    selectedPoolId,
    setSelectedPoolId,
    activePools,
    matchCounts,
    filterMatches,
    reload: () => {
      void poolsState.reloadPools();
      void predictionsState.reloadFixtures();
      void rankingsState.reloadRankings();
    },
  };
}
