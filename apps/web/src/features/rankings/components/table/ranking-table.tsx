'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { SCORING_ACHIEVEMENT_COLUMNS } from '../../constants/scoring-rule-filters';
import type { RankingSortKey, SortDirection } from '../../hooks/use-ranking-table';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import { RankingRow } from './ranking-row';
import { RankingSortableHead } from './ranking-sortable-head';

interface RankingTableProps {
  rows: RankingEntry[];
  isPoolSelected: boolean;
  scoringRule: RankingScoringRuleFilter;
  sortKey: RankingSortKey;
  sortDir: SortDirection;
  onSort: (key: RankingSortKey) => void;
}

export function RankingTable({
  rows,
  isPoolSelected,
  scoringRule,
  sortKey,
  sortDir,
  onSort,
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
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='text-muted-foreground w-14 text-center text-xs'>
              Posição
            </TableHead>
            <TableHead className='text-muted-foreground min-w-[180px] text-xs'>
              Participante
            </TableHead>
            {SCORING_ACHIEVEMENT_COLUMNS.map(column => (
              <RankingSortableHead
                key={column.key}
                label={column.label}
                column={column.key}
                sortKey={sortKey}
                sortDir={sortDir}
                onSort={onSort}
                align='center'
                className={cn(
                  'min-w-[88px]',
                  scoringRule === column.key && 'bg-primary/5',
                )}
                title={column.label}
              />
            ))}
            <TableHead className='text-muted-foreground text-right text-xs'>
              Pontos
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((entry, index) => (
            <RankingRow
              key={entry.id}
              entry={entry}
              position={index + 1}
              scoringRule={scoringRule}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
