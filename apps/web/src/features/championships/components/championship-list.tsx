'use client';

import { useChampionshipFilters } from '../hooks/use-championship-filters';
import { ChampionshipFilters } from './filters/championship-filters';
import { ChampionshipTable } from './table/championship-table';

export function ChampionshipList() {
  const { search, setSearch, status, setStatus, filteredChampionships } =
    useChampionshipFilters();

  return (
    <div className='flex flex-col gap-4'>
      <ChampionshipFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />
      <ChampionshipTable championships={filteredChampionships} />
    </div>
  );
}
