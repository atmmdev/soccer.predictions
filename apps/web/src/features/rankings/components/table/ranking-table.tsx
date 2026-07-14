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
import { RankingLegend } from '../ranking-legend';
import { RankingRow } from './ranking-row';
import { RankingSortableHead } from './ranking-sortable-head';

interface RankingTableProps {
  rows: RankingEntry[];
  isPoolSelected: boolean;
  scoringRule: RankingScoringRuleFilter;
  sortKey: RankingSortKey;
  sortDir: SortDirection;
  onSort: (key: RankingSortKey) => void;
  positionOffset?: number;
}

export function RankingTable({
  rows,
  isPoolSelected,
  scoringRule,
  sortKey,
  sortDir,
  onSort,
  positionOffset = 0,
}: RankingTableProps) {
  if (!isPoolSelected) {
    return (
      <div className='flex items-center justify-center py-16'>
        <div className='max-w-sm space-y-2 text-center'>
          <p className='text-foreground text-sm font-medium'>
            Selecione um bolão
          </p>
          <p className='text-muted-foreground text-sm'>
            Escolha um bolão no filtro acima para visualizar a classificação
            dos participantes.
          </p>
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-center text-sm'>
          Nenhum participante encontrado com os filtros selecionados.
          <br />
          Tente limpar a busca, alterar o bolão ou escolher outra regra de
          pontuação.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-hidden'>
      <div className='overflow-x-auto'>
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
      <RankingLegend />
    </div>
  );
}
