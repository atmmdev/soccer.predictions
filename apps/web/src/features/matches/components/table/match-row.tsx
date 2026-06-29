'use client';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { MatchStatusBadge } from '@/features/dashboard/matches/components/match-status-badge';
import { TableCell, TableRow } from '@/components/ui/table';

import type { MatchFixtureItem } from '../../types/match-fixture';
import { formatMatchResult } from '../../utils/format-match-result';

interface MatchRowProps {
  fixture: MatchFixtureItem;
}

function formatFixtureDate(date: string) {
  return format(parseISO(date), 'dd/MM - HH:mm', { locale: ptBR });
}

export function MatchRow({ fixture }: MatchRowProps) {
  return (
    <TableRow>
      <TableCell className='text-muted-foreground whitespace-nowrap text-xs'>
        {formatFixtureDate(fixture.date)}
      </TableCell>
      <TableCell>
        <MatchStatusBadge status={fixture.status} />
      </TableCell>
      <TableCell className='text-xs'>
        <div className='flex flex-col gap-1'>
          <span className='font-medium'>{fixture.homeTeam}</span>
          <span className='font-medium'>{fixture.awayTeam}</span>
        </div>
      </TableCell>
      <TableCell className='text-muted-foreground text-xs'>
        {fixture.championshipName}
      </TableCell>
      <TableCell className='text-center text-xs'>
        {fixture.round}
      </TableCell>
      <TableCell className='text-center text-xs font-medium'>
        {formatMatchResult(fixture)}
      </TableCell>
    </TableRow>
  );
}
