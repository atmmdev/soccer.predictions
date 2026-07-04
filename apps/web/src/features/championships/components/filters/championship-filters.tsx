'use client';

import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import { filterToolbarClassName } from '@/lib/filter-styles';

import type { ChampionshipFiltersProps } from '../../types/championship-filters';
import { CreateChampionshipDialog } from '../dialogs/create-championship-dialog';
import { ChampionshipCountrySelect } from './championship-country-select';
import { ChampionshipSearch } from './championship-search';
import { ChampionshipSeasonSelect } from './championship-season-select';
import { ChampionshipStatusSelect } from './championship-status-select';

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
  hasActiveFilters,
  onClearFilters,
  onCreateChampionship,
}: ChampionshipFiltersProps) {
  return (
    <>
      <div className={filterToolbarClassName}>
        <ChampionshipSearch
          value={search}
          onChange={onSearchChange}
          className='xl:min-w-[200px] xl:flex-1'
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
        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        />
        <CreateChampionshipDialog onCreate={onCreateChampionship} />
      </div>

      <p className='text-muted-foreground px-2 text-xs xl:ml-auto'>
        <span
          className={resultCount === 0 ? 'text-red-500' : 'text-primary'}
        >
          {resultCount} Campeonato
          {resultCount !== 1 ? 's' : ''} encontrados
        </span>
      </p>
    </>
  );
}
