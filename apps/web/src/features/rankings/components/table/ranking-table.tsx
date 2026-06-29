'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import { RankingRow } from './ranking-row';

interface RankingTableProps {
  rows: RankingEntry[];
  showPoolColumn: boolean;
  scoringRule: RankingScoringRuleFilter;
  scoringRuleLabel: string | null;
}

export function RankingTable({
  rows,
  showPoolColumn,
  scoringRule,
  scoringRuleLabel,
}: RankingTableProps) {
  const metricColumnLabel =
    scoringRuleLabel ?? 'Placares exatos';

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
            <TableHead className='text-muted-foreground w-14 text-xs'>
              Posição
            </TableHead>
            <TableHead className='text-muted-foreground text-xs'>
              Participante
            </TableHead>
            {showPoolColumn ? (
              <TableHead className='text-muted-foreground hidden text-xs sm:table-cell'>
                Bolão
              </TableHead>
            ) : null}
            <TableHead className='text-muted-foreground text-center text-xs'>
              {metricColumnLabel}
            </TableHead>
            <TableHead className='text-muted-foreground text-center text-xs'>
              Palpites
            </TableHead>
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
              showPoolColumn={showPoolColumn}
              scoringRule={scoringRule}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
