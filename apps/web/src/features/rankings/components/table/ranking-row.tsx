'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { cn } from '@/lib/utils';

import { RANKING_STAT_COLUMNS } from '../../constants/ranking-columns';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import {
  getRankingStatValue,
} from '../../utils/ranking-stats';

interface RankingRowProps {
  entry: RankingEntry;
  position: number;
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
  scoringRule,
}: RankingRowProps) {
  return (
    <TableRow
      className={cn(entry.isCurrentUser && 'bg-primary/5 hover:bg-primary/10')}
    >
      <TableCell className='w-14 px-2 text-center'>
        <div className='flex items-center justify-center'>
          <PositionBadge position={position} />
        </div>
      </TableCell>
      <TableCell className='min-w-[180px] px-3'>
        <div className='flex items-center gap-2.5'>
          <Avatar className='size-8'>
            <AvatarFallback className='bg-muted text-xs font-medium'>
              {getInitials(entry.name)}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <span className='block truncate font-medium'>
              {entry.name} {' '}
              {entry.isCurrentUser ? (
                <span className='text-primary text-xs font-medium'>Você</span>
              ) : null}
            </span>
            <span className='text-muted-foreground block truncate text-xs'>
              {entry.email}
            </span>
          </div>
        </div>
      </TableCell>
      {RANKING_STAT_COLUMNS.map(column => (
        <TableCell
          key={column.key}
          className={cn(
            'px-2 text-center text-sm font-medium tabular-nums',
            scoringRule === column.key && 'bg-primary/5 text-primary',
            column.key === 'predictionsCount' && 'hidden sm:table-cell',
            (column.key === 'loserScore' ||
              column.key === 'drawWithoutExactScore') &&
              'hidden lg:table-cell',
          )}
        >
          {getRankingStatValue(entry, column.key)}
        </TableCell>
      ))}
      <TableCell className='px-3 text-right'>
        <span className='font-bold tabular-nums'>
          {entry.points.toLocaleString('pt-BR')}
        </span>{' '}
        <span className='text-muted-foreground text-xs'>pts</span>
      </TableCell>
    </TableRow>
  );
}
