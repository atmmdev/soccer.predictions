'use client';

import { Crosshair, Medal, Target, TrendingUp, Trophy } from 'lucide-react';
import { TbPercentage } from 'react-icons/tb';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLoading } from '@/components/ui/page-loading';
import { StatsCard } from '@/features/dashboard/stats/components/stats-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { AchievementChart } from './charts/achievement-chart';
import { PointsEvolutionChart } from './charts/points-evolution-chart';
import { PoolPerformanceChart } from './charts/pool-performance-chart';
import { useStatistics } from '../hooks/use-statistics';

export function StatisticsPage() {
  const { isLoading, error, data, reload } = useStatistics();

  if (isLoading) {
    return <PageLoading label='Carregando estatísticas...' />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center gap-2 py-12 text-center'>
          <p className='text-destructive text-sm'>{error}</p>
          <button
            type='button'
            className='text-primary text-sm underline'
            onClick={() => void reload()}
          >
            Tentar novamente
          </button>
        </CardContent>
      </Card>
    );
  }

  if (data.evaluatedGames === 0) {
    return (
      <Card>
        <CardContent className='py-12 text-center'>
          <p className='text-muted-foreground text-sm'>
            Ainda não há jogos finalizados com os seus palpites para gerar
            estatísticas.
          </p>
        </CardContent>
      </Card>
    );
  }

  const averagePointsLabel = data.averagePoints.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        <StatsCard
          item={{
            title: 'Jogos avaliados',
            value: data.evaluatedGames.toLocaleString('pt-BR'),
            trend: 'Finalizados com o seu palpite',
            icon: Target,
            iconBackground: 'bg-violet-100',
            iconColor: 'text-violet-600',
          }}
        />
        <StatsCard
          item={{
            title: 'Pontos totais',
            value: data.totalPoints.toLocaleString('pt-BR'),
            trend: 'Soma nos jogos avaliados',
            icon: TrendingUp,
            iconBackground: 'bg-amber-100',
            iconColor: 'text-amber-600',
          }}
        />
        <StatsCard
          item={{
            title: 'Média de pontos / jogo',
            value: averagePointsLabel,
            trend: 'Pontos ÷ jogos avaliados',
            icon: Trophy,
            iconBackground: 'bg-sky-100',
            iconColor: 'text-sky-600',
          }}
        />
        <StatsCard
          item={{
            title: 'Taxa de placar exato',
            value: `${data.exactScoreRate}%`,
            trend: `${data.achievements.exactScore} placares exatos`,
            trendPositive: data.exactScoreRate > 0,
            icon: TbPercentage,
            iconBackground: 'bg-rose-100',
            iconColor: 'text-rose-600',
          }}
        />
      </div>

      <div className='grid gap-6 xl:grid-cols-3'>
        <PointsEvolutionChart data={data.pointsEvolution} />{' '}
        <AchievementChart data={data.achievementChart} />
        <PoolPerformanceChart data={data.poolPerformance} />
      </div>

      <Card>
        <CardHeader className='flex flex-row flex-wrap items-center justify-between gap-3'>
          <CardTitle className='text-base'>Classificação</CardTitle>
          <div className='flex items-center gap-2 text-sm'>
            <Medal className='text-muted-foreground size-4' />
            <span className='text-muted-foreground'>Melhor posição:</span>
            <span className='font-semibold'>
              {data.bestPosition ? `${data.bestPosition}º lugar` : '—'}
            </span>
          </div>
        </CardHeader>
        <CardContent className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow className='text-xs'>
                <TableHead>Bolão</TableHead>
                <TableHead>Campeonato</TableHead>
                <TableHead className='text-center'>Posição</TableHead>
                <TableHead className='text-right'>Pontos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.poolStandings.map(row => (
                <TableRow key={row.poolId}>
                  <TableCell className='font-medium'>{row.poolName}</TableCell>
                  <TableCell className='text-muted-foreground'>
                    {row.championshipName}
                  </TableCell>
                  <TableCell className='text-center'>
                    <span className='inline-flex items-center gap-1.5 font-semibold'>
                      <Crosshair className='text-muted-foreground size-3.5' />
                      {row.position}º
                    </span>
                  </TableCell>
                  <TableCell className='text-right font-bold tabular-nums'>
                    {row.points.toLocaleString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
