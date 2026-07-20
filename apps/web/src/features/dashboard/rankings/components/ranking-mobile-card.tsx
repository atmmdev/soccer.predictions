import { UserAvatar } from '@/components/ui/user-avatar';

import type { RankingUser } from '../types/ranking';
import { PositionBadge } from './position-badge';

interface RankingMobileCardProps {
  user: RankingUser;
  position: number;
}

export function RankingMobileCard({ user, position }: RankingMobileCardProps) {
  return (
    <article className='flex items-center gap-3 bg-card px-3 py-1'>
      <PositionBadge position={position} />
      <UserAvatar name={user.name} avatarDataUrl={user.avatarDataUrl} />
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium'>{user.name}</p>
        <p className='text-muted-foreground truncate text-xs'>{user.email}</p>
      </div>
      <div className='shrink-0 text-right'>
        <span className='text-sm font-bold'>
          {user.points.toLocaleString('pt-BR')}
        </span>{' '}
        <span className='text-muted-foreground text-xs'>pts</span>
      </div>
    </article>
  );
}
