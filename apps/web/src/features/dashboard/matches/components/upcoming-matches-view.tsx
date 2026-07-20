import { ResponsiveDataView } from '@/components/ui/responsive-data-view';

import type { Match } from '../types/match';
import { MatchMobileList } from './match-mobile-list';
import { MatchTable } from './match-table';

interface UpcomingMatchesViewProps {
  matches: Match[];
  rowKeyPrefix: string;
}

export function UpcomingMatchesView({
  matches,
  rowKeyPrefix,
}: UpcomingMatchesViewProps) {
  return (
    <ResponsiveDataView
      breakpoint='xl'
      desktop={
        <MatchTable matches={matches} rowKeyPrefix={rowKeyPrefix} />
      }
      mobile={
        <MatchMobileList matches={matches} rowKeyPrefix={rowKeyPrefix} />
      }
    />
  );
}
