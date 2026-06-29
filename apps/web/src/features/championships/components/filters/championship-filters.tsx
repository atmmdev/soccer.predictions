'use client';

import { Label } from '@/components/ui/label';
import { CreateChampionshipDialog } from '../dialogs/create-championship-dialog';
import { ChampionshipCountrySelect } from './championship-country-select';
import { ChampionshipSearch } from './championship-search';
import { ChampionshipSeasonSelect } from './championship-season-select';
import { ChampionshipStatusSelect } from './championship-status-select';

interface ChampionshipFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  country: string;
  onCountryChange: (value: string) => void;
  countries: string[];
  season: string;
  onSeasonChange: (value: string) => void;
  seasons: number[];
  resultCount: number;
}

export function ChampionshipFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  country,
  onCountryChange,
  countries,
  season,
  onSeasonChange,
  seasons,
  resultCount,
}: ChampionshipFiltersProps) {
  return (
    <>
      <div className='flex flex-col gap-3 xl:flex-row xl:items-center'>
        <ChampionshipSearch
          value={search}
          onChange={onSearchChange}
          className='xl:flex-1'
        />
        <ChampionshipCountrySelect
          value={country}
          onChange={onCountryChange}
          countries={countries}
        />
        <ChampionshipSeasonSelect
          value={season}
          onChange={onSeasonChange}
          seasons={seasons}
        />
        <ChampionshipStatusSelect value={status} onChange={onStatusChange} />
        <CreateChampionshipDialog />
      </div>

      <p className='text-muted-foreground xl:ml-auto text-xs px-2'>
        <span
          className={
            resultCount === 0
              ? 'text-red-500'
              : 'text-primary'
          }
        >
          {resultCount} Campeonato
          {resultCount !== 1 ? 's' : ''} encontrados
        </span>
      </p>
    </>
  );
}
