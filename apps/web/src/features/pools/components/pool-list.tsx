'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PageLoading } from '@/components/ui/page-loading';

import { usePoolList } from '../hooks/use-pool-list';
import { PoolFilters } from './filters/pool-filters';
import { PoolTable } from './table/pool-table';

export function PoolList() {
  const { isLoading, error, reloadPools, createPool, updatePoolStatus, searchFilters, tableState } =
    usePoolList();

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
        {isLoading ? (
          <PageLoading compact label='Carregando bolões...' />
        ) : error ? (
          <div className='flex flex-col items-center justify-center gap-3 py-12'>
            <p className='text-destructive text-sm text-center'>{error}</p>
            <button
              type='button'
              className='text-primary text-sm underline'
              onClick={() => void reloadPools()}
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <PoolTable
            rows={tableState.rows}
            sortKey={tableState.sortKey}
            sortDir={tableState.sortDir}
            onSort={tableState.toggleSort}
            onStatusChange={updatePoolStatus}
          />
        )}
      </CardContent>
    </Card>
  );
}
