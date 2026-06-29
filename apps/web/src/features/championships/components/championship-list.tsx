'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useChampionshipFilters } from '../hooks/use-championship-filters';
import { useChampionships } from '../hooks/use-championships';
import { ChampionshipFilters } from './filters/championship-filters';
import { ChampionshipTable } from './table/championship-table';
import { useChampionshipTable } from './table/hooks/use-championship-table';

export function ChampionshipList() {
  const { championships, createChampionship } = useChampionships();
  const { search, setSearch, status, setStatus, filteredChampionships } =
    useChampionshipFilters(championships);

  const {
    rows,
    countries,
    seasons,
    country,
    setCountry,
    season,
    setSeason,
    sortKey,
    sortDir,
    toggleSort,
  } = useChampionshipTable(filteredChampionships);

  return (
    <Card className='overflow-visible shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
        <ChampionshipFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          country={country}
          onCountryChange={setCountry}
          countries={countries}
          season={season}
          onSeasonChange={setSeason}
          seasons={seasons}
          resultCount={rows.length}
          onCreateChampionship={createChampionship}
        />
        <ChampionshipTable
          rows={rows}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={toggleSort}
        />
      </CardContent>
    </Card>
  );
}
