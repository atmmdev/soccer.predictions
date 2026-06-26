import {
  Bell,
  Target,
  Trophy,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { PiSoccerBallDuotone } from 'react-icons/pi';

import { ActivityItem, ActivityType } from '../types/activity';

const iconMap: Record<ActivityType, LucideIcon | typeof PiSoccerBallDuotone> = {
  participant: UserPlus,
  pool: Trophy,
  prediction: Target,
  match: PiSoccerBallDuotone,
  ranking: Bell,
};

const colorMap: Record<ActivityType, string> = {
  participant: 'bg-sky-100 text-sky-600',
  pool: 'bg-emerald-100 text-emerald-600',
  prediction: 'bg-violet-100 text-violet-600',
  match: 'bg-amber-100 text-amber-600',
  ranking: 'bg-rose-100 text-rose-600',
};

interface ActivityFeedItemProps {
  item: ActivityItem;
}

export function ActivityFeedItem({ item }: ActivityFeedItemProps) {
  const Icon = iconMap[item.type];

  return (
    <div className='flex items-start gap-3 border-b py-3 last:border-b-0'>
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${colorMap[item.type]}`}
      >
        <Icon className='size-4' />
      </div>
      <div className='min-w-0 flex-1'>
        <p className='text-sm leading-snug'>{item.message}</p>
        <p className='text-muted-foreground mt-1 text-xs'>{item.timestamp}</p>
      </div>
    </div>
  );
}
