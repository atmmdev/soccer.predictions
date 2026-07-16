'use client';

import { ActivityList } from '@/features/dashboard/activity/components/activity-list';

export function NotificationsPage() {
  return (
    <div className='flex flex-col gap-4'>
      <ActivityList />
    </div>
  );
}
