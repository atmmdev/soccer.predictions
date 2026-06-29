'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useMatchList } from '../hooks/use-match-list';
import { MatchFilters } from './filters/match-filters';
import { MatchTable } from './table/match-table';

export function MatchList() {
  const { searchFilters } = useMatchList();

  return (
    <Card className='overflow-visible shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
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
        <MatchTable rows={searchFilters.filteredFixtures} />
      </CardContent>
    </Card>
  );
}
