import type { RankingUser } from '../types/ranking';
import { RankingMobileCard } from './ranking-mobile-card';

interface RankingMobileListProps {
  users: RankingUser[];
}

export function RankingMobileList({ users }: RankingMobileListProps) {
  return (
    <div className='space-y-2'>
      {users.map((user, index) => (
        <RankingMobileCard
          key={user.id}
          user={user}
          position={index + 1}
        />
      ))}
    </div>
  );
}
