import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { activities } from './mocks/activity';
import { ActivityFeedItem } from './components/activity-feed-item';

export function ActivityFeed() {
  return (
    <section>
      <Card className='shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
          <h2 className='section-title mb-0'>Atividade Recente</h2>
          <Link
            href='/notifications'
            className='text-primary text-sm font-medium hover:underline'
          >
            Ver todas
          </Link>
        </CardHeader>
        <CardContent>
          {activities.map(item => (
            <ActivityFeedItem key={item.id} item={item} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
