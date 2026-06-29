'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useRankingList } from '../hooks/use-ranking-list';
import { RankingFilters } from './filters/ranking-filters';
import { RankingTable } from './table/ranking-table';

export function RankingList() {
  const { searchFilters } = useRankingList();

  return (
    <Card className='overflow-visible shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
        <RankingFilters
          search={searchFilters.search}
          onSearchChange={searchFilters.setSearch}
          poolName={searchFilters.poolName}
          onPoolNameChange={searchFilters.setPoolName}
          poolOptions={searchFilters.poolOptions}
          scoringRule={searchFilters.scoringRule}
          onScoringRuleChange={searchFilters.setScoringRule}
          championshipName={searchFilters.selectedChampionshipName}
          resultCount={searchFilters.filteredEntries.length}
          hasActiveFilters={searchFilters.hasActiveFilters}
          onClearFilters={searchFilters.clearFilters}
        />
        <RankingTable
          rows={searchFilters.filteredEntries}
          showPoolColumn={searchFilters.poolName === 'ALL'}
          scoringRule={searchFilters.scoringRule}
          scoringRuleLabel={searchFilters.activeScoringRuleLabel}
        />
      </CardContent>
    </Card>
  );
}
