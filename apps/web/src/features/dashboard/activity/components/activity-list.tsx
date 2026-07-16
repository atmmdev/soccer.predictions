'use client';

import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { useClientPagination } from '@/hooks/use-client-pagination';
import { DEFAULT_PAGE_SIZE } from '@/lib/pagination';

import { ActivityFeedItem } from './activity-feed-item';
import { useActivity } from '../hooks/use-activity';

interface ActivityListProps {
  fetchLimit?: number;
  pageSize?: number;
}

export function ActivityList({
  fetchLimit = 100,
  pageSize = DEFAULT_PAGE_SIZE,
}: ActivityListProps) {
  const { items, isLoading, error, reloadActivity } = useActivity(fetchLimit, {
    hideRead: false,
    markVisibleAsRead: true,
  });
  const pagination = useClientPagination(items, { pageSize });

  if (isLoading) {
    return <PageLoading label='Carregando atividade...' />;
  }

  if (error) {
    return (
      <div className='flex flex-col items-center gap-2 py-12'>
        <p className='text-destructive text-center text-sm'>{error}</p>
        <button
          type='button'
          className='text-primary text-sm underline'
          onClick={() => void reloadActivity()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className='text-muted-foreground py-12 text-center text-sm'>
        Nenhuma atividade recente nos seus bolões.
      </p>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-lg border border-gray-200 bg-white px-4'>
        {pagination.pageItems.map(item => (
          <ActivityFeedItem key={item.id} item={item} />
        ))}
      </div>
      <ListPagination pagination={pagination} itemLabel='atividades' />
    </div>
  );
}
