'use client';

import { MatchStatusBadge } from '@/features/dashboard/matches/components/match-status-badge';
import { MatchTeamsStack, ScoreStack } from '@/components/matches';
import {
  DateTimeDisplay,
  dateTimeTableCellClassName,
} from '@/components/ui/datetime-display';
import { TableCell, TableRow } from '@/components/ui/table';

import type { MatchFixtureItem } from '../../types/match-fixture';

interface MatchRowProps {
  fixture: MatchFixtureItem;
}

export function MatchRow({ fixture }: MatchRowProps) {
  return (
    <TableRow>
      <TableCell className={dateTimeTableCellClassName + ' text-center'}>
        <DateTimeDisplay value={fixture.date} />
      </TableCell>
      <TableCell className='text-xs'>
        <MatchTeamsStack
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          homeTeamLogo={fixture.homeTeamLogo}
          awayTeamLogo={fixture.awayTeamLogo}
        />
      </TableCell>
      <TableCell className='text-muted-foreground text-xs text-center'>
        {fixture.championshipName}
      </TableCell>
      <TableCell className='text-center text-xs'>
        {fixture.round}
      </TableCell>
      <TableCell className='text-center'>
        <ScoreStack
          scores={{
            home: fixture.officialHomeScore,
            away: fixture.officialAwayScore,
          }}
        />
      </TableCell>
      <TableCell className='text-center'>
        <MatchStatusBadge status={fixture.status} />
      </TableCell>
    </TableRow>
  );
}
