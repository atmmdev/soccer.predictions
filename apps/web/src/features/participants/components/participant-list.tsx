'use client';

import { Search } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListPagination } from '@/components/ui/list-pagination';
import { NativeSelect } from '@/components/ui/native-select';
import { PageLoading } from '@/components/ui/page-loading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserAvatar } from '@/components/ui/user-avatar';
import { useClientPagination } from '@/hooks/use-client-pagination';
import {
  lineTabTriggerClassName,
  lineTabsListClassName,
} from '@/lib/line-tabs';
import { cn } from '@/lib/utils';

import {
  useParticipantFilters,
  useParticipants,
  type ParticipantRoleTab,
} from '../hooks/use-participants';
import { ParticipantMembershipsView } from './participant-memberships-view';

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

export function ParticipantList() {
  const {
    participants,
    isLoading,
    error,
    actingKey,
    reloadParticipants,
    approveParticipant,
    rejectParticipant,
  } = useParticipants();
  const filters = useParticipantFilters(participants);

  const pagination = useClientPagination(filters.groupedParticipants, {
    resetKey: [
      filters.search,
      filters.roleTab,
      filters.sort,
      filters.status,
    ].join('|'),
  });

  const accordionKey = [
    filters.search,
    filters.roleTab,
    filters.sort,
    filters.status,
    pagination.page,
    pagination.pageSize,
    pagination.pageItems.map(group => group.userId).join(','),
  ].join('|');

  const defaultOpenUserIds = pagination.pageItems
    .filter(group => group.pendingCount > 0)
    .map(group => String(group.userId));

  return (
    <>
      {filters.pendingCount > 0 ? (
        <div className='flex flex-col gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-zinc-700 sm:flex-row sm:items-center sm:justify-between'>
          <p>
            Você tem {filters.pendingCount} pedido(s) de acesso aguardando
            aprovação.
          </p>
          <Button
            type='button'
            size='xs'
            variant='soft'
            onClick={() => filters.setStatus('PENDING')}
          >
            Ver pendentes
          </Button>
        </div>
      ) : null}
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <Tabs
          value={filters.roleTab}
          onValueChange={value =>
            filters.setRoleTab(value as ParticipantRoleTab)
          }
        >
          <TabsList variant='line' className={lineTabsListClassName}>
            <TabsTrigger
              value='ALL'
              className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
            >
              Todos
              <TabCount
                value={filters.tabCounts.all}
                active={filters.roleTab === 'ALL'}
              />
            </TabsTrigger>
            <TabsTrigger
              value='OWNER'
              className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
            >
              Sou dono
              <TabCount
                value={filters.tabCounts.owner}
                active={filters.roleTab === 'OWNER'}
              />
            </TabsTrigger>
            <TabsTrigger
              value='MEMBER'
              className={cn(lineTabTriggerClassName, 'items-center gap-1.5')}
            >
              Participo
              <TabCount
                value={filters.tabCounts.member}
                active={filters.roleTab === 'MEMBER'}
              />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
          <div className='relative min-w-0 flex-1 sm:w-56'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
            <Input
              placeholder='Buscar participantes...'
              className='bg-white pl-9'
              value={filters.search}
              onChange={event => filters.setSearch(event.target.value)}
            />
          </div>
          <NativeSelect
            value={filters.sort}
            onChange={event =>
              filters.setSort(
                event.target.value as 'recent' | 'name-asc' | 'name-desc',
              )
            }
            className='w-full bg-white sm:w-40'
          >
            <option value='recent'>Mais recentes</option>
            <option value='name-asc'>Nome A–Z</option>
            <option value='name-desc'>Nome Z–A</option>
          </NativeSelect>
        </div>
      </div>

      {filters.status !== 'ALL' ? (
        <div className='flex items-center gap-2 px-1'>
          <Badge variant='secondary'>
            Filtro:{' '}
            {filters.status === 'PENDING'
              ? 'Pendentes'
              : filters.status === 'ACTIVE'
                ? 'Ativos'
                : 'Inativos'}
          </Badge>
          <Button
            type='button'
            size='xs'
            variant='ghost'
            onClick={() => filters.setStatus('ALL')}
          >
            Limpar
          </Button>
        </div>
      ) : null}

      {isLoading ? (
        <PageLoading compact label='Carregando participantes...' />
      ) : error ? (
        <div className='flex flex-col items-center justify-center gap-3 py-12'>
          <p className='text-destructive text-center text-sm'>{error}</p>
          <button
            type='button'
            className='text-primary text-sm underline'
            onClick={() => void reloadParticipants()}
          >
            Tentar novamente
          </button>
        </div>
      ) : filters.groupedParticipants.length === 0 ? (
        <div className='flex items-center justify-center py-12'>
          <p className='text-muted-foreground text-sm'>
            Nenhum participante encontrado.
          </p>
        </div>
      ) : (
        <>
          <Accordion
            key={accordionKey}
            type='multiple'
            defaultValue={defaultOpenUserIds}
            className='gap-1'
          >
            {pagination.pageItems.map(group => {
              const value = String(group.userId);
              const poolsLabel =
                group.memberships.length === 1
                  ? '1 bolão'
                  : `${group.memberships.length} bolões`;

              return (
                <AccordionItem
                  key={value}
                  value={value}
                  className={cn(
                    'bg-card px-3 shadow-sm transition-colors not-last:border-b-0',
                    'data-open:border-primary data-open:ring-1 data-open:ring-primary/25',
                  )}
                >
                  <AccordionTrigger className='items-center gap-2 py-3.5 hover:no-underline'>
                    <div className='flex min-w-0 flex-1 items-center gap-3 pr-2'>
                      <UserAvatar
                        name={group.name}
                        avatarDataUrl={group.avatarDataUrl}
                        fallbackClassName='bg-primary/10 font-semibold text-primary'
                      />

                      <div className='min-w-0 flex-1 text-left'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <span className='truncate font-semibold text-zinc-900'>
                            {group.name}
                          </span>
                          {group.isOwnerAnywhere ? (
                            <Badge
                              variant='secondary'
                              className='bg-primary/10 text-primary'
                            >
                              Dono
                            </Badge>
                          ) : null}
                          <Badge variant='outline' className='font-normal'>
                            {poolsLabel}
                          </Badge>
                        </div>
                        <p className='text-muted-foreground truncate text-xs font-normal'>
                          {group.email}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className='pb-3'>
                    <ParticipantMembershipsView
                      memberships={group.memberships}
                      actingKey={actingKey}
                      onApprove={(poolId, userId) =>
                        void approveParticipant(poolId, userId)
                      }
                      onReject={(poolId, userId) =>
                        void rejectParticipant(poolId, userId)
                      }
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <ListPagination pagination={pagination} itemLabel='participantes' />
        </>
      )}
    </>
  );
}
