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

import type { AchievementChartPoint } from '../../hooks/use-statistics';

const chartConfig = {
  value: {
    label: 'Conquistas',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

interface AchievementChartProps {
  data: AchievementChartPoint[];
}

export function AchievementChart({ data }: AchievementChartProps) {
  const hasAchievements = data.some(item => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base'>Conquistas por tipo</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasAchievements ? (
          <p className='text-muted-foreground py-16 text-center text-sm'>
            Nenhuma conquista registrada até o momento.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='h-80 w-full aspect-auto'
          >
            <BarChart
              accessibilityLayer
              data={data}
              layout='vertical'
              margin={{ left: 16, right: 12 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type='number'
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey='label'
                type='category'
                tickLine={false}
                axisLine={false}
                width={118}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey='value'
                fill='var(--color-value)'
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
