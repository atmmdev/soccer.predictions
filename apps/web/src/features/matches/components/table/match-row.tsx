'use client';

import { MatchStatusBadge } from '@/features/dashboard/matches/components/match-status-badge';
import { ScoreStack } from '@/components/matches';
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
      <TableCell className={dateTimeTableCellClassName}>
        <DateTimeDisplay value={fixture.date} />
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
      <TableCell className='text-center'>
        <ScoreStack
          scores={{
            home: fixture.officialHomeScore,
            away: fixture.officialAwayScore,
          }}
        />
      </TableCell>
    </TableRow>
  );
}
