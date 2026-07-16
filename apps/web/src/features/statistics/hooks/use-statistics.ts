'use client';

import { useMemo } from 'react';

import { usePredictions } from '@/features/predictions/hooks/use-predictions';
import type { PredictionFixtureItem } from '@/features/predictions/types/prediction-fixture';
import { useRankings } from '@/features/rankings/hooks/use-rankings';
import type {
  RankingEntry,
  RankingScoringAchievements,
  ScoringAchievementKey,
} from '@/features/rankings/types/ranking-entry';

export interface PoolStandingRow {
  poolId: number;
  poolName: string;
  championshipName: string;
  position: number;
  points: number;
}

export interface PointsEvolutionPoint {
  date: string;
  label: string;
  points: number;
  cumulativePoints: number;
}

export interface AchievementChartPoint {
  key: ScoringAchievementKey;
  label: string;
  value: number;
}

export interface PoolPerformancePoint {
  poolId: number;
  poolName: string;
  games: number;
  totalPoints: number;
  averagePoints: number;
  exactScoreRate: number;
  position: number | null;
}

export interface StatisticsData {
  evaluatedGames: number;
  totalPoints: number;
  averagePoints: number;
  exactScoreRate: number;
  achievements: RankingScoringAchievements;
  bestPosition: number | null;
  poolStandings: PoolStandingRow[];
  pointsEvolution: PointsEvolutionPoint[];
  achievementChart: AchievementChartPoint[];
  poolPerformance: PoolPerformancePoint[];
}

const EMPTY_ACHIEVEMENTS: RankingScoringAchievements = {
  exactScore: 0,
  winnerScore: 0,
  loserScore: 0,
  correctWinner: 0,
  drawWithoutExactScore: 0,
  playerGoal: 0,
  playerHatTrick: 0,
};

function isExactScore(fixture: PredictionFixtureItem): boolean {
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
}

function sumAchievements(
  entries: RankingEntry[],
): RankingScoringAchievements {
  return entries.reduce(
    (acc, entry) => {
      const a = entry.scoringAchievements;
      return {
        exactScore: acc.exactScore + a.exactScore,
        winnerScore: acc.winnerScore + a.winnerScore,
        loserScore: acc.loserScore + a.loserScore,
        correctWinner: acc.correctWinner + a.correctWinner,
        drawWithoutExactScore:
          acc.drawWithoutExactScore + a.drawWithoutExactScore,
        playerGoal: acc.playerGoal + a.playerGoal,
        playerHatTrick: acc.playerHatTrick + a.playerHatTrick,
      };
    },
    { ...EMPTY_ACHIEVEMENTS },
  );
}

function getPositionInPool(
  entries: RankingEntry[],
  poolId: number,
  userId: number,
): number | null {
  const poolEntries = entries
    .filter(entry => entry.poolId === poolId)
    .sort((left, right) => {
      if (right.points !== left.points) {
        return right.points - left.points;
      }

      return left.name.localeCompare(right.name);
    });

  const index = poolEntries.findIndex(entry => entry.id === userId);

  return index >= 0 ? index + 1 : null;
}

export const ACHIEVEMENT_BREAKDOWN: Array<{
  key: ScoringAchievementKey;
  label: string;
}> = [
  { key: 'exactScore', label: 'Placares exatos' },
  { key: 'winnerScore', label: 'Placar do vencedor' },
  { key: 'loserScore', label: 'Placar do perdedor' },
  { key: 'correctWinner', label: 'Vencedor correto' },
  { key: 'drawWithoutExactScore', label: 'Empate sem placar exato' },
  { key: 'playerGoal', label: 'Gol de jogador' },
  { key: 'playerHatTrick', label: 'Hat-trick de jogador' },
];

function getCalendarDay(date: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

function formatCalendarDay(day: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${day}T12:00:00Z`));
}

function buildPointsEvolution(
  fixtures: PredictionFixtureItem[],
): PointsEvolutionPoint[] {
  const pointsByDay = new Map<string, number>();

  for (const fixture of fixtures) {
    const day = getCalendarDay(fixture.date);
    pointsByDay.set(day, (pointsByDay.get(day) ?? 0) + (fixture.earnedPoints ?? 0));
  }

  let cumulativePoints = 0;

  return [...pointsByDay.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, points]) => {
      cumulativePoints += points;

      return {
        date,
        label: formatCalendarDay(date),
        points,
        cumulativePoints,
      };
    });
}

function buildPoolPerformance(
  fixtures: PredictionFixtureItem[],
  standings: PoolStandingRow[],
): PoolPerformancePoint[] {
  const pools = new Map<
    number,
    {
      poolName: string;
      games: number;
      totalPoints: number;
      exactScores: number;
    }
  >();

  for (const fixture of fixtures) {
    const current = pools.get(fixture.poolId) ?? {
      poolName: fixture.poolName,
      games: 0,
      totalPoints: 0,
      exactScores: 0,
    };

    current.games += 1;
    current.totalPoints += fixture.earnedPoints ?? 0;
    current.exactScores += isExactScore(fixture) ? 1 : 0;
    pools.set(fixture.poolId, current);
  }

  return [...pools.entries()]
    .map(([poolId, pool]) => ({
      poolId,
      poolName: pool.poolName,
      games: pool.games,
      totalPoints: pool.totalPoints,
      averagePoints: Number((pool.totalPoints / pool.games).toFixed(2)),
      exactScoreRate: Math.round((pool.exactScores / pool.games) * 100),
      position:
        standings.find(standing => standing.poolId === poolId)?.position ?? null,
    }))
    .sort((left, right) => right.averagePoints - left.averagePoints);
}

export function useStatistics() {
  const predictionsState = usePredictions();
  const rankingsState = useRankings();

  const isLoading =
    predictionsState.isLoading || rankingsState.isLoading;

  const error = predictionsState.error ?? rankingsState.error;

  const data = useMemo((): StatisticsData => {
    const ownFixtures = predictionsState.fixtures.filter(
      fixture => fixture.isOwnPrediction && fixture.prediction !== null,
    );
    const finished = ownFixtures.filter(
      fixture => fixture.matchStatus === 'FINISHED',
    );

    const evaluatedGames = finished.length;
    const totalPoints = finished.reduce(
      (sum, fixture) => sum + (fixture.earnedPoints ?? 0),
      0,
    );
    const averagePoints =
      evaluatedGames > 0 ? totalPoints / evaluatedGames : 0;

    const exactHits = finished.filter(isExactScore).length;
    const exactScoreRate =
      evaluatedGames > 0
        ? Math.round((exactHits / evaluatedGames) * 100)
        : 0;

    const currentUserEntries = rankingsState.entries.filter(
      entry => entry.isCurrentUser,
    );
    const achievements = sumAchievements(currentUserEntries);

    const poolStandings: PoolStandingRow[] = currentUserEntries
      .map(entry => {
        const position = getPositionInPool(
          rankingsState.entries,
          entry.poolId,
          entry.id,
        );

        if (position === null) {
          return null;
        }

        return {
          poolId: entry.poolId,
          poolName: entry.poolName,
          championshipName: entry.championshipName,
          position,
          points: entry.points,
        };
      })
      .filter((row): row is PoolStandingRow => row !== null)
      .sort((left, right) => left.position - right.position);

    const bestPosition =
      poolStandings.length > 0
        ? Math.min(...poolStandings.map(row => row.position))
        : null;
    const pointsEvolution = buildPointsEvolution(finished);
    const achievementChart = ACHIEVEMENT_BREAKDOWN.map(item => ({
      ...item,
      value: achievements[item.key],
    }));
    const poolPerformance = buildPoolPerformance(finished, poolStandings);

    return {
      evaluatedGames,
      totalPoints,
      averagePoints,
      exactScoreRate,
      achievements,
      bestPosition,
      poolStandings,
      pointsEvolution,
      achievementChart,
      poolPerformance,
    };
  }, [predictionsState.fixtures, rankingsState.entries]);

  return {
    isLoading,
    error,
    data,
    reload: () => {
      void predictionsState.reloadFixtures();
      void rankingsState.reloadRankings();
    },
  };
}
