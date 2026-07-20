import { MatchTeamsInline } from '@/components/matches';
import { DateTimeDisplay } from '@/components/ui/datetime-display';
import { Separator } from '@/components/ui/separator';

import type { Match } from '../types/match';
import { MatchPredictions } from './match-predictions';
import { MatchResult } from './match-results';
import { MatchStatusBadge } from './match-status-badge';
import { PointsBadge } from './points-badge';

interface MatchMobileCardProps {
  match: Match;
}

export function MatchMobileCard({ match }: MatchMobileCardProps) {
  return (
    <article className='border-border space-y-3 rounded-lg border bg-card p-4 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <DateTimeDisplay
          value={match.date}
          className='text-foreground'
        />
        <MatchStatusBadge status={match.status} />
      </div>

      <div className='flex justify-center'>
        <MatchTeamsInline
          homeTeam={match.homeTeam.name}
          awayTeam={match.awayTeam.name}
          homeTeamLogo={match.homeTeam.flag}
          awayTeamLogo={match.awayTeam.flag}
          className='justify-center'
          size={18}
        />
      </div>

      <Separator />

      <div className='grid grid-cols-3 gap-2 text-center text-xs'>
        <div className='space-y-1.5'>
          <p className='text-muted-foreground'>Oficial</p>
          <div className='flex justify-center'>
            <MatchResult match={match} />
          </div>
        </div>
        <div className='space-y-1.5'>
          <p className='text-muted-foreground'>Meu palpite</p>
          <div className='flex justify-center'>
            <MatchPredictions match={match} />
          </div>
        </div>
        <div className='space-y-1.5'>
          <p className='text-muted-foreground'>Pontos</p>
          <div className='flex justify-center'>
            <PointsBadge match={match} />
          </div>
        </div>
      </div>
    </article>
  );
}
