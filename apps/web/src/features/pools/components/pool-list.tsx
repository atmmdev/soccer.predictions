'use client';

import { useState } from 'react';

import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { canParticipateInPools } from '@/features/auth/lib/role-access';
import { useClientPagination } from '@/hooks/use-client-pagination';
import {
  lineTabTriggerClassName,
  lineTabsListClassName,
} from '@/lib/line-tabs';
import { cn } from '@/lib/utils';

import { useDiscoverablePools } from '../hooks/use-discoverable-pools';
import { usePoolList } from '../hooks/use-pool-list';
import { DiscoverablePoolsTable } from './discoverable-pools-table';
import { PoolFilters } from './filters/pool-filters';
import { PoolTable } from './table/pool-table';

type PoolsTab = 'mine' | 'available';

function TabCount({ value, active }: { value: number; active: boolean }) {
  return (
    <span
      className={cn(
        'ml-1 inline-flex size-5 items-center justify-center rounded-full text-[10px] font-semibold',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground',
      )}
    >
      {value}
    </span>
  );
}

export function PoolList() {
  const canDiscover = canParticipateInPools(getStoredUser()?.role);
  const [tab, setTab] = useState<PoolsTab>('mine');
  const {
    isLoading,
    error,
    reloadPools,
    createPool,
    updatePool,
    updatePoolStatus,
    searchFilters,
    tableState,
  } = usePoolList();
  const discoverState = useDiscoverablePools(canDiscover);

  return (
    <>
      {canDiscover ? (
        <Tabs value={tab} onValueChange={value => setTab(value as PoolsTab)}>
          <TabsList variant='line' className={lineTabsListClassName}>
            <TabsTrigger
              value='mine'
              className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
            >
              Meus bolões
              {!isLoading ? (
                <TabCount value={tableState.rows.length} active={tab === 'mine'} />
              ) : null}
            </TabsTrigger>
            <TabsTrigger
              value='available'
              className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
            >
              Disponíveis
              {!discoverState.isLoading ? (
                <TabCount
                  value={discoverState.pools.length}
                  active={tab === 'available'}
                />
              ) : null}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='mine' className='mt-4 space-y-4'>
            <MyPoolsSection
              isLoading={isLoading}
              error={error}
              reloadPools={reloadPools}
              createPool={createPool}
              updatePool={updatePool}
              updatePoolStatus={updatePoolStatus}
              searchFilters={searchFilters}
              tableState={tableState}
            />
          </TabsContent>

          <TabsContent value='available' className='mt-4'>
            <DiscoverablePoolsTable
              pools={discoverState.pools}
              isLoading={discoverState.isLoading}
              error={discoverState.error}
              requestingPoolId={discoverState.requestingPoolId}
              onRetry={() => void discoverState.reloadPools()}
              onRequestAccess={discoverState.requestAccess}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <MyPoolsSection
          isLoading={isLoading}
          error={error}
          reloadPools={reloadPools}
          createPool={createPool}
          updatePool={updatePool}
          updatePoolStatus={updatePoolStatus}
          searchFilters={searchFilters}
          tableState={tableState}
        />
      )}
    </>
  );
}

function MyPoolsSection({
  isLoading,
  error,
  reloadPools,
  createPool,
  updatePool,
  updatePoolStatus,
  searchFilters,
  tableState,
}: Pick<
  ReturnType<typeof usePoolList>,
  | 'isLoading'
  | 'error'
  | 'reloadPools'
  | 'createPool'
  | 'updatePool'
  | 'updatePoolStatus'
  | 'searchFilters'
  | 'tableState'
>) {
  const pagination = useClientPagination(tableState.rows, {
    resetKey: [
      searchFilters.search,
      searchFilters.status,
      tableState.sortKey,
      tableState.sortDir,
    ].join('|'),
  });

  return (
    <>
      <PoolFilters
        search={searchFilters.search}
        onSearchChange={searchFilters.setSearch}
        status={searchFilters.status}
        onStatusChange={searchFilters.setStatus}
        hasActiveFilters={searchFilters.hasActiveFilters}
        onClearFilters={searchFilters.clearFilters}
        onCreatePool={createPool}
      />
      {isLoading ? (
        <PageLoading compact label='Carregando bolões...' />
      ) : error ? (
        <div className='flex flex-col items-center justify-center gap-3 py-12'>
          <p className='text-destructive text-center text-sm'>{error}</p>
          <button
            type='button'
            className='text-primary text-sm underline'
            onClick={() => void reloadPools()}
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <>
          <PoolTable
            rows={pagination.pageItems}
            sortKey={tableState.sortKey}
            sortDir={tableState.sortDir}
            onSort={tableState.toggleSort}
            onUpdatePool={updatePool}
            onStatusChange={updatePoolStatus}
          />
          <ListPagination pagination={pagination} itemLabel='bolões' />
        </>
      )}
    </>
  );
}
