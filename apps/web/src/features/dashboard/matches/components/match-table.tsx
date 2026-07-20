import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Match } from '../types/match';
import { MatchTableRow } from './match-table-row';

interface MatchTableProps {
  matches: Match[];
  rowKeyPrefix: string;
}

export function MatchTable({ matches, rowKeyPrefix }: MatchTableProps) {
  return (
    <div className='min-w-0 [&_[data-slot=table-container]]:overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow className='text-xs'>
            <TableHead>Data / Hora</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-center'>Jogo</TableHead>
            <TableHead className='text-center'>Resultado Oficial</TableHead>
            <TableHead className='text-center'>Meu Palpite</TableHead>
            <TableHead>Pontos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match, index) => (
            <MatchTableRow
              key={`${rowKeyPrefix}-${match.id}-${index}`}
              match={match}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
