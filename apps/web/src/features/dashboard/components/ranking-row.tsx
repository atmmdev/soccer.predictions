import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RankingUser } from '@/types/ranking';

interface RankingRowProps {
  user: RankingUser;
  position: number;
}

export function RankingRow({ user, position }: RankingRowProps) {
  return (
    // TODO: Implementar apenas os 10 primeiros.
    <div className='flex items-center justify-between gap-3'>
      <div className='flex items-center gap-2'>
        <span className='font-bold text-lg'>{position}º</span>
        <div className='flex items-center gap-1'>
          <Avatar>
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <span className='font-medium text-lg'>{user.name}</span>
        </div>
      </div>
      <Badge className='flex items-center gap-1 text-xs'>
        {user.points} pontos
      </Badge>
    </div>
  );
}
