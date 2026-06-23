import { ChampionshipHeader } from './components/championship-header';
import { ChampionshipTable } from './components/championship-table';

export function Championships() {
  return (
    <div className="flex flex-col gap-4">
      <ChampionshipHeader />
      <ChampionshipTable />
    </div>
  );
}