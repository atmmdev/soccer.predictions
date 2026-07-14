import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { RankingUser } from '@/features/dashboard/rankings/types/ranking';
import { PositionBadge } from './position-badge';

interface RankingRowProps {
  user: RankingUser;
  position: number;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

export function RankingRow({ user, position }: RankingRowProps) {
  return (
    <TableRow>
      <TableCell className='w-14'>
        <PositionBadge position={position} />
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2.5'>
          <Avatar className='size-8'>
            <AvatarFallback className='bg-muted text-xs font-medium'>
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <p className='truncate font-medium'>{user.name}</p>
            <p className='text-muted-foreground truncate text-xs'>
              {user.email}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell className='text-right'>
        <span className='font-bold'>{user.points.toLocaleString('pt-BR')}</span>{' '}
        <span className='text-muted-foreground text-xs'>pts</span>
      </TableCell>
    </TableRow>
  );
}
