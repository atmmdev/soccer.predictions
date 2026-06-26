import { Card, CardContent } from '@/components/ui/card';
import { DashboardSectionTitle } from '@/features/dashboard/components/dashboard-section-title';
import { activities } from './mocks/activity';
import { ActivityFeedItem } from './components/activity-feed-item';

export function ActivityFeed() {
  return (
    <section>
      <DashboardSectionTitle>Atividade Recente</DashboardSectionTitle>
      <Card className='shadow-sm'>
        <CardContent>
          {activities.map(item => (
            <ActivityFeedItem key={item.id} item={item} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
