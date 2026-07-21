'use client';

import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { useClientPagination } from '@/hooks/use-client-pagination';

import { useMatchList } from '../hooks/use-match-list';
import { MatchFilters } from './filters/match-filters';
import { MatchView } from './table/match-view';

export function MatchList() {
  const { searchFilters, isLoading, error, reloadFixtures } = useMatchList();

  const pagination = useClientPagination(searchFilters.filteredFixtures, {
    resetKey: [
      searchFilters.search,
      searchFilters.status,
      searchFilters.championshipName,
      searchFilters.selectedRound ?? '',
      searchFilters.dateFrom,
      searchFilters.dateTo,
    ].join('|'),
  });

  return (
    <>
      <MatchFilters
        search={searchFilters.search}
        onSearchChange={searchFilters.setSearch}
        status={searchFilters.status}
        onStatusChange={searchFilters.setStatus}
        championshipName={searchFilters.championshipName}
        onChampionshipNameChange={searchFilters.setChampionshipName}
        selectedRound={searchFilters.selectedRound}
        onRoundChange={searchFilters.setSelectedRound}
        availableRounds={searchFilters.availableRounds}
        currentRound={searchFilters.currentRound}
        isLeagueChampionship={searchFilters.isLeagueChampionship}
        dateFrom={searchFilters.dateFrom}
        onDateFromChange={searchFilters.setDateFrom}
        dateTo={searchFilters.dateTo}
        onDateToChange={searchFilters.setDateTo}
        championshipOptions={searchFilters.championshipOptions}
        hasActiveFilters={searchFilters.hasActiveFilters}
        onClearFilters={searchFilters.clearFilters}
      />

      {isLoading ? (
        <PageLoading compact label='Carregando jogos...' />
      ) : error ? (
        <div className='flex flex-col items-center justify-center gap-3 py-12'>
          <p className='text-destructive text-center text-sm'>{error}</p>
          <button
            type='button'
            className='text-primary text-sm underline'
            onClick={() => void reloadFixtures()}
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <>
          <MatchView rows={pagination.pageItems} />
          <ListPagination pagination={pagination} itemLabel='jogos' />
        </>
      )}
    </>
  );
}
