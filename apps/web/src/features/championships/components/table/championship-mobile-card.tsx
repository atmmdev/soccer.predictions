import type { Championship } from '../../types/championship';
import { CountryFlag } from '../country-flag';
import { ChampionshipActions } from './championship-actions';
import { ChampionshipStatusBadge } from './championship-status-badge';

interface ChampionshipMobileCardProps {
  championship: Championship;
  onSync: (championshipId: number) => Promise<boolean>;
  onStatusChange: (championshipId: number, active: boolean) => Promise<boolean>;
}

export function ChampionshipMobileCard({
  championship,
  onSync,
  onStatusChange,
}: ChampionshipMobileCardProps) {
  return (
    <article className='border-border space-y-3 rounded-lg border bg-card p-3 shadow-sm'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0 flex-1'>
          <CountryFlag
            flag={championship.flags || '🏆'}
            name={championship.name}
            className='inline-flex min-w-0 items-center gap-2 text-sm font-medium'
          />
          <p className='text-muted-foreground mt-1 truncate text-xs'>
            {championship.country} · {championship.season}
          </p>
        </div>
        <ChampionshipStatusBadge status={championship.status} />
      </div>

      <div className='flex justify-end'>
        <ChampionshipActions
          championship={championship}
          onSync={onSync}
          onStatusChange={onStatusChange}
        />
      </div>
    </article>
  );
}
