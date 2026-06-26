'use client';

import { usePathname } from 'next/navigation';

import { defaultPageMeta, pageMeta } from '@/config/page-meta';

export function AppBreadcrumb() {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? defaultPageMeta;

  return (
    <div className='flex min-w-0 flex-col gap-0.5'>
      <h1 className='title truncate'>{meta.title}</h1>
      <p className='text-muted-foreground truncate text-sm'>{meta.subtitle}</p>
    </div>
  );
}
