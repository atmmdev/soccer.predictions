'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { RANKING_STAT_COLUMNS } from '../../constants/ranking-columns';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import {
  getPositionAccentClass,
  getRankingStatValue,
} from '../../utils/ranking-stats';

interface RankingRowProps {
  entry: RankingEntry;
  position: number;
  totalRows: number;
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
  totalRows,
  scoringRule,
}: RankingRowProps) {
  return (
    <TableRow
      className={cn(
        entry.isCurrentUser && 'bg-primary/5 hover:bg-primary/10',
        getPositionAccentClass(position, totalRows),
      )}
    >
      <TableCell className='w-10 px-2 text-center text-sm'>
        {position}
      </TableCell>
      <TableCell className='min-w-[180px] px-3'>
        <div className='flex items-center gap-2.5'>
          <Avatar className='size-8'>
            <AvatarFallback className='bg-muted text-xs font-medium'>
              {getInitials(entry.name)}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <span className='block truncate font-medium'>{entry.name}</span>
            {entry.isCurrentUser ? (
              <span className='text-primary text-xs font-medium'>Você</span>
            ) : null}
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
