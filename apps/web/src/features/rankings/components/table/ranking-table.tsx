'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { RANKING_STAT_COLUMNS } from '../../constants/ranking-columns';
import type { RankingSortKey, SortDirection } from '../../hooks/use-ranking-table';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import { RankingRow } from './ranking-row';
import { RankingSortableHead } from './ranking-sortable-head';

interface RankingTableProps {
  rows: RankingEntry[];
  scoringRule: RankingScoringRuleFilter;
  sortKey: RankingSortKey;
  sortDir: SortDirection;
  onSort: (key: RankingSortKey) => void;
  positionOffset?: number;
}

export function RankingTable({
  rows,
  scoringRule,
  sortKey,
  sortDir,
  onSort,
  positionOffset = 0,
}: RankingTableProps) {
  return (
    <div className='min-w-0 [&_[data-slot=table-container]]:overflow-x-auto'>
      <Table className='min-w-[720px] bg-white'>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='text-muted-foreground w-14 px-2 text-center text-xs'>
              #
            </TableHead>
            <TableHead className='text-muted-foreground min-w-[180px] px-3 text-left text-xs'>
              Participante
            </TableHead>
            {RANKING_STAT_COLUMNS.map(column => (
              <RankingSortableHead
                key={column.key}
                label={column.sigla}
                column={column.key}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
                align='center'
                className={cn(
                  'w-11 px-2',
                  scoringRule === column.key && 'bg-primary/5',
                  column.key === 'predictionsCount' && 'hidden sm:table-cell',
                  (column.key === 'loserScore' ||
                    column.key === 'drawWithoutExactScore') &&
                    'hidden lg:table-cell',
                )}
                title={column.label}
              />
            ))}
            <RankingSortableHead
              label='Pts'
              column='points'
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
              align='right'
              className='text-muted-foreground w-16 px-3'
              title='Pontos totais'
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((entry, index) => (
            <RankingRow
              key={`${entry.poolId}-${entry.id}`}
              entry={entry}
              position={positionOffset + index + 1}
              scoringRule={scoringRule}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
