'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useRankingList } from '../hooks/use-ranking-list';
import { RankingFilters } from './filters/ranking-filters';
import { RankingTable } from './table/ranking-table';

export function RankingList() {
  const { searchFilters, tableState, isLoading, error, reloadRankings } =
    useRankingList();

  return (
    <Card className='min-w-0 overflow-hidden shadow-sm'>
      <CardContent className='min-w-0 space-y-4 pt-4'>
        <RankingFilters
          search={searchFilters.search}
          onSearchChange={searchFilters.setSearch}
          poolName={searchFilters.poolName}
          onPoolNameChange={searchFilters.setPoolName}
          poolOptions={searchFilters.poolOptions}
          scoringRule={searchFilters.scoringRule}
          onScoringRuleChange={searchFilters.setScoringRule}
          championshipName={searchFilters.selectedChampionshipName}
          resultCount={tableState.rows.length}
          isPoolSelected={searchFilters.isPoolSelected}
          hasActiveFilters={searchFilters.hasActiveFilters}
          onClearFilters={searchFilters.clearFilters}
        />
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground text-sm'>
              Carregando ranking...
            </p>
          </div>
        ) : error ? (
          <div className='flex flex-col items-center justify-center gap-3 py-12'>
            <p className='text-destructive text-center text-sm'>{error}</p>
            <button
              type='button'
              className='text-primary text-sm underline'
              onClick={() => void reloadRankings()}
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <RankingTable
            rows={tableState.rows}
            isPoolSelected={searchFilters.isPoolSelected}
            scoringRule={searchFilters.scoringRule}
            sortKey={tableState.sortKey}
            sortDir={tableState.sortDir}
            onSort={tableState.toggleSort}
          />
        )}
      </CardContent>
    </Card>
  );
}
