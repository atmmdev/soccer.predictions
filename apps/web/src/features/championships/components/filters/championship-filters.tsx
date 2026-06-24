'use client';

import { ChampionshipSearch } from './championship-search';
import { ChampionshipStatusSelect } from './championship-status-select';

interface ChampionshipFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export function ChampionshipFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: ChampionshipFiltersProps) {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
      <ChampionshipSearch value={search} onChange={onSearchChange} />
      <ChampionshipStatusSelect value={status} onChange={onStatusChange} />
    </div>
  );
}