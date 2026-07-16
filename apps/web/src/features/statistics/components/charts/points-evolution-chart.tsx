'use client';

import {
  CartesianGrid,
  Line,
  LineChart,
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

import type { PointsEvolutionPoint } from '../../hooks/use-statistics';

const chartConfig = {
  cumulativePoints: {
    label: 'Pontos acumulados',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

interface PointsEvolutionChartProps {
  data: PointsEvolutionPoint[];
}

export function PointsEvolutionChart({
  data,
}: PointsEvolutionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Evolução de pontos</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className='text-muted-foreground py-16 text-center text-sm'>
            Ainda não há pontos para exibir.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='h-72 w-full aspect-auto'
          >
            <LineChart
              accessibilityLayer
              data={data}
              margin={{ left: 4, right: 12, top: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='label'
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={32}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator='line'
                  />
                }
              />
              <Line
                type='monotone'
                dataKey='cumulativePoints'
                stroke='var(--color-cumulativePoints)'
                strokeWidth={2.5}
                dot={{ r: 3, fill: 'var(--color-cumulativePoints)' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
