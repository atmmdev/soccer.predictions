'use client';

import { Card, CardContent } from '@/components/ui/card';

import { usePoolList } from '../hooks/use-pool-list';
import { PoolFilters } from './filters/pool-filters';
import { PoolTable } from './table/pool-table';

export function PoolList() {
  const { createPool, searchFilters, tableState } = usePoolList();

  return (
    <Card className='overflow-visible shadow-sm'>
      <CardContent className='space-y-4 pt-4'>
        <PoolFilters
          search={searchFilters.search}
          onSearchChange={searchFilters.setSearch}
          status={searchFilters.status}
          onStatusChange={searchFilters.setStatus}
          resultCount={tableState.rows.length}
          hasActiveFilters={searchFilters.hasActiveFilters}
          onClearFilters={searchFilters.clearFilters}
          onCreatePool={createPool}
        />
        <PoolTable
          rows={tableState.rows}
          sortKey={tableState.sortKey}
          sortDir={tableState.sortDir}
          onSort={tableState.toggleSort}
        />
      </CardContent>
    </Card>
  );
}
