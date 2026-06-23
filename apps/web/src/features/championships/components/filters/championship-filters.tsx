"use client"

import { ChampionshipSearch } from './championship-search';
import { ChampionshipStatusSelect } from './championship-status-select';

export function ChampionshipFilters() {
  return (
    <div className='flex gap-4'>
      <ChampionshipSearch value='' onChange={() => {}} />
      <ChampionshipStatusSelect value='all' onChange={() => {}} />
    </div>
  );
}
