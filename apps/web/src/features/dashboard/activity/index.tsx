'use client';

import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { useClientPagination } from '@/hooks/use-client-pagination';
import { DEFAULT_PAGE_SIZE } from '@/lib/pagination';

import { ActivityFeedItem } from './components/activity-feed-item';
import { useActivity } from './hooks/use-activity';

interface ActivityFeedProps {
  /** Quantidade máxima buscada na API. */
  fetchLimit?: number;
  /** Itens por página no card. */
  pageSize?: number;
  showViewAll?: boolean;
  viewAllHref?: string;
}

export function ActivityFeed({
  fetchLimit = 50,
  pageSize = DEFAULT_PAGE_SIZE,
  showViewAll = true,
  viewAllHref = '/notifications',
}: ActivityFeedProps) {
  const { items, isLoading, error, reloadActivity } = useActivity(fetchLimit, {
    hideRead: true,
    markVisibleAsRead: true,
  });
  const pagination = useClientPagination(items, { pageSize });

  return (
    <section>
      <Card className='shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
          <h2 className='section-title mb-0'>Atividade Recente</h2>
          {showViewAll ? (
            <Link
              href={viewAllHref}
              className='text-primary text-sm font-medium hover:underline'
            >
              Ver todas
            </Link>
          ) : null}
        </CardHeader>
        <CardContent className='space-y-2'>
          {isLoading ? (
            <PageLoading compact label='Carregando atividade...' />
          ) : error ? (
            <div className='flex flex-col items-center gap-2 py-8'>
              <p className='text-destructive text-center text-sm'>{error}</p>
              <button
                type='button'
                className='text-primary text-sm underline'
                onClick={() => void reloadActivity()}
              >
                Tentar novamente
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className='text-muted-foreground py-8 text-center text-sm'>
              Nenhuma atividade nova. As já lidas ficam em Ver todas.
            </p>
          ) : (
            <>
              {pagination.pageItems.map(item => (
                <ActivityFeedItem key={item.id} item={item} />
              ))}
              <ListPagination
                pagination={pagination}
                itemLabel='atividades'
                className='pt-2'
              />
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
