import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RankingUser } from '@/types/ranking';

interface RankingRowProps {
  user: RankingUser;
  position: number;
}

export function RankingRow({ user, position }: RankingRowProps) {
  return (
    // TODO: Implementar apenas os 10 primeiros. Trocar para tabela. Adicionar medalhas para os 3 primeiros.
    <div className='flex items-center justify-between gap-3'>
      <div className='flex items-center gap-2'>
        <span className='font-bold'>{position}º</span>
        <div className='flex items-center gap-1'>
          <Avatar>
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <span className='font-medium'>{user.name}</span>
        </div>
      </div>
      <Badge className='flex items-center gap-1 text-xs text-right'>
        {user.points} pontos
      </Badge>
      <span className='font-medium'>R$ 1680,00</span>
    </div>
  );
}
