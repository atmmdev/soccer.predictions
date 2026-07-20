'use client';

import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { useClientPagination } from '@/hooks/use-client-pagination';

import { useChampionshipList } from '../hooks/use-championship-list';
import { ChampionshipFilters } from './filters/championship-filters';
import { ChampionshipView } from './table/championship-view';

export function ChampionshipList() {
  const {
    isLoading,
    error,
    reloadChampionships,
    createChampionship,
    syncChampionship,
    updateChampionshipStatus,
    searchFilters,
    tableState,
    hasActiveFilters,
    clearFilters,
  } = useChampionshipList();

  const pagination = useClientPagination(tableState.rows, {
    resetKey: [
      searchFilters.search,
      searchFilters.status,
      tableState.country,
      tableState.season,
      tableState.sortKey,
      tableState.sortDir,
    ].join('|'),
  });

  return (
    <>
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
        <PageLoading compact label='Carregando campeonatos...' />
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
        <>
          <ChampionshipView
            rows={pagination.pageItems}
            sortKey={tableState.sortKey}
            sortDir={tableState.sortDir}
            onSort={tableState.toggleSort}
            onSync={syncChampionship}
            onStatusChange={updateChampionshipStatus}
          />
          <ListPagination pagination={pagination} itemLabel='campeonatos' />
        </>
      )}
    </>
  );
}
