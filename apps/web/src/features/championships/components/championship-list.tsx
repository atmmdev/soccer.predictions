'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useChampionshipList } from '../hooks/use-championship-list';
import { ChampionshipFilters } from './filters/championship-filters';
import { ChampionshipTable } from './table/championship-table';

export function ChampionshipList() {
  const {
    isLoading,
    error,
    reloadChampionships,
    createChampionship,
    syncChampionship,
    searchFilters,
    tableState,
    hasActiveFilters,
    clearFilters,
  } = useChampionshipList();

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
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          onCreateChampionship={createChampionship}
        />
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground text-sm'>
              Carregando campeonatos...
            </p>
          </div>
        ) : error ? (
          <div className='flex flex-col items-center justify-center gap-3 py-12'>
            <p className='text-destructive text-center text-sm'>{error}</p>
            <button
              type='button'
              className='text-primary text-sm underline'
              onClick={() => void reloadChampionships()}
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <ChampionshipTable
            rows={tableState.rows}
            sortKey={tableState.sortKey}
            sortDir={tableState.sortDir}
            onSort={tableState.toggleSort}
            onSync={syncChampionship}
          />
        )}
      </CardContent>
    </Card>
  );
}
