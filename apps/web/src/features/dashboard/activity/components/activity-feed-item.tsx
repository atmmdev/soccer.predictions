import { Award, FileText, Trophy, UserPlus, type LucideIcon } from 'lucide-react';

import type { ActivityItem, ActivityType } from '../types/activity';
import { formatActivityRelativeTime } from '../utils/format-activity-time';

const iconMap: Record<ActivityType, LucideIcon> = {
  participant: UserPlus,
  prediction: FileText,
  pool: Trophy,
  result: Award,
};

const colorMap: Record<ActivityType, string> = {
  participant: 'bg-emerald-100 text-emerald-600',
  prediction: 'bg-violet-100 text-violet-600',
  pool: 'bg-orange-100 text-orange-600',
  result: 'bg-sky-100 text-sky-600',
};

interface ActivityFeedItemProps {
  item: ActivityItem;
}

export function ActivityFeedItem({ item }: ActivityFeedItemProps) {
  const Icon = iconMap[item.type];

  return (
    <div className='flex items-start gap-3 border-b border-gray-200 py-3 last:border-b-0'>
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colorMap[item.type]}`}
      >
        <Icon className='size-4' />
      </div>
      <div className='min-w-0 flex-1 space-y-0.5'>
        <p className='text-sm leading-snug font-semibold'>{item.title}</p>
        <p className='text-muted-foreground text-sm leading-snug'>
          {item.description}
        </p>
      </div>
      <span className='text-muted-foreground shrink-0 pt-0.5 text-xs whitespace-nowrap'>
        {formatActivityRelativeTime(item.occurredAt)}
      </span>
    </div>
  );
}
