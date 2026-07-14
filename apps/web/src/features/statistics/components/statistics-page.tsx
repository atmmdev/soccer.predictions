'use client';

import type { ComponentType } from 'react';
import { useMemo } from 'react';
import {
  ChartSpline,
  Target,
  Trophy,
  TrendingUp,
  Users,
} from 'lucide-react';
import { TbPercentage } from 'react-icons/tb';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLoading } from '@/components/ui/page-loading';
import { usePredictions } from '@/features/predictions/hooks/use-predictions';
import { usePools } from '@/features/pools/hooks/use-pools';
import { useRankings } from '@/features/rankings/hooks/use-rankings';

interface StatCardProps {
  title: string;
  value: string;
  hint: string;
  icon: ComponentType<{ className?: string }>;
  iconBackground: string;
  iconColor: string;
}

function StatCard({
  title,
  value,
  hint,
  icon: Icon,
  iconBackground,
  iconColor,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className='flex items-start gap-4 pt-6'>
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
        >
          <Icon className={`size-5 ${iconColor}`} />
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-sm'>{title}</p>
          <p className='text-2xl font-semibold tracking-tight'>{value}</p>
          <p className='text-muted-foreground text-xs'>{hint}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatisticsPage() {
  const poolsState = usePools();
  const predictionsState = usePredictions();
  const rankingsState = useRankings();

  const isLoading =
    poolsState.isLoading ||
    predictionsState.isLoading ||
    rankingsState.isLoading;

  const error =
    poolsState.error ?? predictionsState.error ?? rankingsState.error;

  const stats = useMemo(() => {
    const ownFixtures = predictionsState.fixtures.filter(
      fixture => fixture.isOwnPrediction,
    );
    const registered = ownFixtures.filter(
      fixture => fixture.prediction !== null,
    );
    const finished = registered.filter(
      fixture => fixture.matchStatus === 'FINISHED',
    );
    const hits = finished.filter(fixture => (fixture.earnedPoints ?? 0) > 0);
    const hitRate =
      finished.length > 0
        ? Math.round((hits.length / finished.length) * 100)
        : 0;
    const totalPoints = rankingsState.entries
      .filter(entry => entry.isCurrentUser)
      .reduce((sum, entry) => sum + entry.points, 0);
    const userEntries = rankingsState.entries.filter(entry => entry.isCurrentUser);
    let bestPosition: number | null = null;

    for (const entry of userEntries) {
      const poolEntries = rankingsState.entries
        .filter(item => item.poolId === entry.poolId)
        .sort((left, right) => {
          if (right.points !== left.points) {
            return right.points - left.points;
          }

          return left.name.localeCompare(right.name);
        });
      const position = poolEntries.findIndex(item => item.id === entry.id) + 1;

      if (position > 0 && (bestPosition === null || position < bestPosition)) {
        bestPosition = position;
      }
    }
    const participantsTotal = new Set(
      rankingsState.entries.map(entry => entry.id),
    ).size;

    return {
      poolsCount: poolsState.pools.length,
      participantsTotal,
      registeredPredictions: registered.length,
      hitRate,
      totalPoints,
      bestPosition,
      exactScores: rankingsState.entries
        .filter(entry => entry.isCurrentUser)
        .reduce((sum, entry) => sum + entry.scoringAchievements.exactScore, 0),
    };
  }, [predictionsState.fixtures, poolsState.pools, rankingsState.entries]);

  if (isLoading) {
    return <PageLoading label='Carregando estatísticas...' />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className='py-12 text-center'>
          <p className='text-destructive text-sm'>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        <StatCard
          title='Bolões'
          value={stats.poolsCount.toLocaleString('pt-BR')}
          hint='Bolões em que você participa'
          icon={Trophy}
          iconBackground='bg-sky-100'
          iconColor='text-sky-600'
        />
        <StatCard
          title='Participantes'
          value={stats.participantsTotal.toLocaleString('pt-BR')}
          hint='Total nos seus bolões'
          icon={Users}
          iconBackground='bg-emerald-100'
          iconColor='text-emerald-600'
        />
        <StatCard
          title='Palpites registrados'
          value={stats.registeredPredictions.toLocaleString('pt-BR')}
          hint='Jogos com palpite seu'
          icon={Target}
          iconBackground='bg-violet-100'
          iconColor='text-violet-600'
        />
        <StatCard
          title='Taxa de acerto'
          value={`${stats.hitRate}%`}
          hint='Jogos finalizados com pontos'
          icon={TbPercentage}
          iconBackground='bg-rose-100'
          iconColor='text-rose-600'
        />
        <StatCard
          title='Pontos totais'
          value={stats.totalPoints.toLocaleString('pt-BR')}
          hint='Soma nos bolões atuais'
          icon={TrendingUp}
          iconBackground='bg-amber-100'
          iconColor='text-amber-600'
        />
        <StatCard
          title='Placares exatos'
          value={stats.exactScores.toLocaleString('pt-BR')}
          hint='Conquistas de placar exato'
          icon={ChartSpline}
          iconBackground='bg-cyan-100'
          iconColor='text-cyan-600'
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Melhor colocação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-2xl font-semibold'>
            {stats.bestPosition ? `${stats.bestPosition}º lugar` : '—'}
          </p>
          <p className='text-muted-foreground mt-1 text-sm'>
            Sua melhor posição atual entre os bolões em que participa.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
