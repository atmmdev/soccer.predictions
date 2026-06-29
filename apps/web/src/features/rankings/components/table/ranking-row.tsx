import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { cn } from '@/lib/utils';

import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import { getAchievementCount } from '../../utils/ranking-scoring';

interface RankingRowProps {
  entry: RankingEntry;
  position: number;
  showPoolColumn: boolean;
  scoringRule: RankingScoringRuleFilter;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

export function RankingRow({
  entry,
  position,
  showPoolColumn,
  scoringRule,
}: RankingRowProps) {
  const ruleCount =
    scoringRule === 'ALL'
      ? entry.scoringAchievements.exactScore
      : getAchievementCount(entry, scoringRule);

  return (
    <TableRow
      className={cn(entry.isCurrentUser && 'bg-primary/5 hover:bg-primary/10')}
    >
      <TableCell className='w-14'>
        <PositionBadge position={position} />
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2.5'>
          <Avatar className='size-8'>
            <AvatarFallback className='bg-muted text-xs font-medium'>
              {getInitials(entry.name)}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='font-medium'>{entry.name}</span>
            {entry.isCurrentUser ? (
              <span className='text-primary text-xs font-medium'>Você</span>
            ) : null}
          </div>
        </div>
      </TableCell>
      {showPoolColumn ? (
        <TableCell className='text-muted-foreground hidden text-sm sm:table-cell'>
          {entry.poolName}
        </TableCell>
      ) : null}
      <TableCell className='text-center text-sm font-medium'>{ruleCount}</TableCell>
      <TableCell className='text-center text-sm'>
        {entry.predictionsCount}
      </TableCell>
      <TableCell className='text-right'>
        <span className='font-bold'>
          {entry.points.toLocaleString('pt-BR')}
        </span>{' '}
        <span className='text-muted-foreground text-xs'>pts</span>
      </TableCell>
    </TableRow>
  );
}
