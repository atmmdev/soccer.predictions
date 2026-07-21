'use client';

import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { useClientPagination } from '@/hooks/use-client-pagination';

import { useRankingList } from '../hooks/use-ranking-list';
import { RankingFilters } from './filters/ranking-filters';
import { RankingView } from './table/ranking-view';

export function RankingList() {
  const {
    poolCatalog,
    selectedPoolId,
    selectedRound,
    selectedChampionshipName,
    isLeague,
    availableRounds,
    isPoolSelected,
    search,
    setSearch,
    scoringRule,
    setScoringRule,
    selectPool,
    selectRound,
    hasActiveFilters,
    clearFilters,
    tableState,
    isLoading,
    error,
    reloadRankings,
  } = useRankingList();

  const pagination = useClientPagination(tableState.rows, {
    resetKey: [
      search,
      selectedPoolId ?? '',
      selectedRound ?? '',
      scoringRule,
      tableState.sortKey,
      tableState.sortDir,
    ].join('|'),
  });

  return (
    <>
      <RankingFilters
        search={search}
        onSearchChange={setSearch}
        selectedPoolId={selectedPoolId}
        onPoolChange={selectPool}
        poolOptions={poolCatalog}
        scoringRule={scoringRule}
        onScoringRuleChange={setScoringRule}
        isLeague={isLeague}
        availableRounds={availableRounds}
        selectedRound={selectedRound}
        onRoundChange={selectRound}
        championshipName={selectedChampionshipName}
        isPoolSelected={isPoolSelected}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {isLoading ? (
        <PageLoading compact label='Carregando classificação...' />
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
          <RankingView
            rows={pagination.pageItems}
            isPoolSelected={isPoolSelected}
            scoringRule={scoringRule}
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
