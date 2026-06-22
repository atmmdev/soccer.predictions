import { TableRow, TableCell } from '@/components/ui/table';
import { Match } from '@/types/match';
import { WinnerBadge } from './winner-badge';
import { MatchStatusBadge } from './match-status-badge';
import { MatchResult } from './match-results';
import { MatchPredictions } from './match-predictions';

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
        <MatchResult match={match} />
      </TableCell>
      <TableCell>
        <MatchPredictions match={match} />
      </TableCell>
      <TableCell>
        <WinnerBadge points={match.points} />
      </TableCell>
    </TableRow>
  );
}
