'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

import type { PoolPerformancePoint } from '../../hooks/use-statistics';

const chartConfig = {
  averagePoints: {
    label: 'Média de pontos',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

interface PoolPerformanceChartProps {
  data: PoolPerformancePoint[];
}

export function PoolPerformanceChart({
  data,
}: PoolPerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Desempenho por bolão</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className='text-muted-foreground py-16 text-center text-sm'>
            Ainda não há desempenho por bolão para exibir.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='h-80 w-full aspect-auto'
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ left: 4, right: 12, top: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='poolName'
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                interval={0}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                allowDecimals
                tickLine={false}
                axisLine={false}
                width={32}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, _name, item) => {
                      const row = item.payload as PoolPerformancePoint;

                      return (
                        <div className='grid min-w-40 gap-1 text-xs'>
                          <div className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>
                              Média por jogo
                            </span>
                            <span className='font-mono font-medium'>
                              {Number(value).toLocaleString('pt-BR', {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>Jogos</span>
                            <span className='font-mono font-medium'>
                              {row.games}
                            </span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>
                              Pontos totais
                            </span>
                            <span className='font-mono font-medium'>
                              {row.totalPoints}
                            </span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>
                              Placar exato
                            </span>
                            <span className='font-mono font-medium'>
                              {row.exactScoreRate}%
                            </span>
                          </div>
                          <div className='flex justify-between gap-4'>
                            <span className='text-muted-foreground'>
                              Posição
                            </span>
                            <span className='font-mono font-medium'>
                              {row.position ? `${row.position}º` : '—'}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                }
              />
              <Bar
                dataKey='averagePoints'
                fill='var(--color-averagePoints)'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
