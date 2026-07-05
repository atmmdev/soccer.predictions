import {
  DateTimeDisplay,
  dateTimeTableCellClassName,
} from '@/components/ui/datetime-display';
import { TableCell, TableRow } from '@/components/ui/table';
import { Match } from '../types/match';
import { MatchPredictions } from './match-predictions';
import { MatchResult } from './match-results';
import { MatchStatusBadge } from './match-status-badge';
import { MatchTeams } from './match-teams';
import { PointsBadge } from './points-badge';

interface MatchTableRowProps {
  match: Match;
}

export function MatchTableRow({ match }: MatchTableRowProps) {
  return (
    <TableRow>
      <TableCell className={dateTimeTableCellClassName}>
        <DateTimeDisplay value={match.date} />
      </TableCell>
      <TableCell>
        <MatchStatusBadge status={match.status} />
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
