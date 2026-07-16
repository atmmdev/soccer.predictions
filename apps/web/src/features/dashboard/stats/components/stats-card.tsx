import { Card, CardContent } from '@/components/ui/card';
import { StatsItem } from '@/features/dashboard/stats/types/stats';
import { StatsIcon } from './stats-icons';

interface StatsCardProps {
  item: StatsItem;
}

export function StatsCard({ item }: StatsCardProps) {
  return (
    <Card className='shadow-sm'>
      <CardContent className='flex flex-col'>
        <div className='flex items-start justify-between'>
          <p className='text-muted-foreground text-sm leading-snug'>{item.title}</p>
          <StatsIcon
            icon={item.icon}
            iconBackground={item.iconBackground}
            iconColor={item.iconColor}
            iconSize={34}
          />
        </div>
        <p className='text-3xl font-bold tracking-tight'>{item.value}</p>
        <p
          className={
            item.trendPositive
              ? 'text-primary text-xs font-medium'
              : 'text-muted-foreground text-xs'
          }
        >
          {item.trend}
        </p>
      </CardContent>
    </Card>
  );
}
