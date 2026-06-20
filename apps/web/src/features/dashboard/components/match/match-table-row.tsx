import { TableRow, TableCell } from '@/components/ui/table';
import { Match } from '@/types/match';
import { WinnerBadge } from './winner-badge';
import { MatchStatusBadge } from './match-status-badge';

interface MatchTableRowProps {
  match: Match;
}

export function MatchTableRow({ match }: MatchTableRowProps) {
  return (
    // TODO: Bandeiras dos clubes e times.
    <TableRow>
      <TableCell>{match.date}</TableCell>
      <TableCell>
        <MatchStatusBadge status={match.status} />
      </TableCell>
      <TableCell>
        {match.homeTeam} {match.homeScore}
        {' x '}
        {match.awayScore} {match.awayTeam}
      </TableCell>
      <TableCell>
        {match.homeTeam} {match.predictedHomeScore}
        {' x '}
        {match.predictedAwayScore} {match.awayTeam}
      </TableCell>
      <TableCell>
        <WinnerBadge points={match.points} />
      </TableCell>
    </TableRow>
  );
}
