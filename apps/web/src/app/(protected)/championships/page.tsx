import { ChampionshipHeader } from '../../../features/championships/components/championship-header';
import { ChampionshipFilters } from '../../../features/championships/components/filters/championship-filters';
import { ChampionshipTable } from '../../../features/championships/components/table/championship-table';

export default function ChampionshipPage() {
  return (
    <div className='flex flex-col gap-4'>
      <ChampionshipHeader />
      <ChampionshipFilters />
      <ChampionshipTable />
    </div>
  );
}
