'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useChampionshipList } from '../hooks/use-championship-list';
import { ChampionshipFilters } from './filters/championship-filters';
import { ChampionshipTable } from './table/championship-table';

export function ChampionshipList() {
  const { createChampionship, searchFilters, tableState } =
    useChampionshipList();

  return (
    <Card className='overflow-visible shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
        <ChampionshipFilters
          search={searchFilters.search}
          onSearchChange={searchFilters.setSearch}
          status={searchFilters.status}
          onStatusChange={searchFilters.setStatus}
          country={tableState.country}
          onCountryChange={tableState.setCountry}
          countries={tableState.countries}
          season={tableState.season}
          onSeasonChange={tableState.setSeason}
          seasons={tableState.seasons}
          resultCount={tableState.rows.length}
          onCreateChampionship={createChampionship}
        />
        <ChampionshipTable
          rows={tableState.rows}
          sortKey={tableState.sortKey}
          sortDir={tableState.sortDir}
          onSort={tableState.toggleSort}
        />
      </CardContent>
    </Card>
  );
}
