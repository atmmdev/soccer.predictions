import type { Championship } from '../../types/championship';
import { ChampionshipMobileCard } from './championship-mobile-card';

interface ChampionshipMobileListProps {
  rows: Championship[];
  onSync: (championshipId: number) => Promise<boolean>;
  onStatusChange: (championshipId: number, active: boolean) => Promise<boolean>;
}

export function ChampionshipMobileList({
  rows,
  onSync,
  onStatusChange,
}: ChampionshipMobileListProps) {
  return (
    <div className='space-y-3'>
      {rows.map(championship => (
        <ChampionshipMobileCard
          key={championship.id}
          championship={championship}
          onSync={onSync}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
