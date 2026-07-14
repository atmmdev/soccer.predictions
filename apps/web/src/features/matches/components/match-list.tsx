'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PageLoading } from '@/components/ui/page-loading';

import { useMatchList } from '../hooks/use-match-list';
import { MatchFilters } from './filters/match-filters';
import { MatchTable } from './table/match-table';

export function MatchList() {
  const { searchFilters, isLoading, error, reloadFixtures } = useMatchList();

  return (
    <Card className='min-w-0 overflow-hidden shadow-sm'>
      <CardContent className='min-w-0 space-y-4 pt-4'>
        <MatchFilters
          search={searchFilters.search}
          onSearchChange={searchFilters.setSearch}
          status={searchFilters.status}
          onStatusChange={searchFilters.setStatus}
          championshipName={searchFilters.championshipName}
          onChampionshipNameChange={searchFilters.setChampionshipName}
          dateFrom={searchFilters.dateFrom}
          onDateFromChange={searchFilters.setDateFrom}
          dateTo={searchFilters.dateTo}
          onDateToChange={searchFilters.setDateTo}
          championshipOptions={searchFilters.championshipOptions}
          resultCount={searchFilters.filteredFixtures.length}
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
          <MatchTable rows={searchFilters.filteredFixtures} />
        )}
      </CardContent>
    </Card>
  );
}
