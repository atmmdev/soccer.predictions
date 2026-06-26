import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { TableCell, TableRow } from '@/components/ui/table';
import { Match } from '../types/match';
import { MatchPredictions } from './match-predictions';
import { MatchResult } from './match-results';
import { MatchTeams } from './match-teams';
import { PointsBadge } from './points-badge';

interface MatchTableRowProps {
  match: Match;
}

function formatMatchDate(date: string) {
  return format(parseISO(date), "dd/MM - HH:mm", { locale: ptBR });
}

export function MatchTableRow({ match }: MatchTableRowProps) {
  return (
    <TableRow>
      <TableCell className='text-muted-foreground whitespace-nowrap text-xs'>
        {formatMatchDate(match.date)}
      </TableCell>
      <TableCell>
        <span className='text-muted-foreground text-xs'>{match.status}</span>
      </TableCell>
      <TableCell>
        <MatchTeams match={match} />
      </TableCell>
      <TableCell className='text-center'>
        <MatchResult match={match} />
      </TableCell>
      <TableCell className='text-center'>
        <MatchPredictions match={match} />
      </TableCell>
      <TableCell>
        <PointsBadge match={match} />
      </TableCell>
    </TableRow>
  );
}
