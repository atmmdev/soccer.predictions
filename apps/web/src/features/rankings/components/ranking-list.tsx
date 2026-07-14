'use client';

import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { useClientPagination } from '@/hooks/use-client-pagination';

import { useRankingList } from '../hooks/use-ranking-list';
import { RankingFilters } from './filters/ranking-filters';
import { RankingTable } from './table/ranking-table';

export function RankingList() {
  const { searchFilters, tableState, isLoading, error, reloadRankings } =
    useRankingList();

  const pagination = useClientPagination(tableState.rows, {
    resetKey: [
      searchFilters.search,
      searchFilters.poolName,
      searchFilters.scoringRule,
      tableState.sortKey,
      tableState.sortDir,
    ].join('|'),
  });

  return (
    <>
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
        <PageLoading compact label='Carregando ranking...' />
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
        <>
          <RankingTable
            rows={pagination.pageItems}
            isPoolSelected={searchFilters.isPoolSelected}
            scoringRule={searchFilters.scoringRule}
            sortKey={tableState.sortKey}
            sortDir={tableState.sortDir}
            onSort={tableState.toggleSort}
            positionOffset={Math.max(0, pagination.rangeStart - 1)}
          />
          <ListPagination pagination={pagination} itemLabel='participantes' />
        </>
      )}
    </>
  );
}
