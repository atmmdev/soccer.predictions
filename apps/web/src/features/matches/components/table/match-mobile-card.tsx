import { MatchTeamsInline } from '@/components/matches';
import { DateTimeDisplay } from '@/components/ui/datetime-display';
import { MatchStatusBadge } from '@/features/dashboard/matches/components/match-status-badge';
import { formatFixtureRoundLabel } from '@/lib/format-fixture-round-label';

import type { MatchFixtureItem } from '../../types/match-fixture';

interface MatchMobileCardProps {
  fixture: MatchFixtureItem;
}

export function MatchMobileCard({ fixture }: MatchMobileCardProps) {
  return (
    <article className='border-border space-y-3 rounded-lg border bg-card p-3 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <DateTimeDisplay value={fixture.date} className='text-foreground' />
        <MatchStatusBadge status={fixture.status} />
      </div>

      <MatchTeamsInline
        homeTeam={fixture.homeTeam}
        awayTeam={fixture.awayTeam}
        homeTeamLogo={fixture.homeTeamLogo}
        awayTeamLogo={fixture.awayTeamLogo}
        homeScore={fixture.officialHomeScore}
        awayScore={fixture.officialAwayScore}
        className='justify-center'
        size={18}
      />

      <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs'>
        <span className='truncate'>{fixture.championshipName} · Rodada {formatFixtureRoundLabel(fixture)}</span>
      </div>
    </article>
  );
}
