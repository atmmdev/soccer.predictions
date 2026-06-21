import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsItem } from '@/types/stats';
import { StatsIcon } from './stats-icon';

interface StatsCardProps {
  item: StatsItem;
}

export function StatsCard({ item }: StatsCardProps) {
  const Icon = item.icon;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-sm text-muted-foreground'>
          {item.title}
        </CardTitle>
        <StatsIcon icon={Icon} iconBackground={item.iconBackground} iconColor={item.iconColor} />
      </CardHeader>
      <CardContent>
        <p className='text-3xl font-bold'>{item.value}</p>
      </CardContent>
    </Card>
  );
}
