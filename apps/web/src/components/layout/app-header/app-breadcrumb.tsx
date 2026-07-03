'use client';

import { usePathname } from 'next/navigation';

import { getPageMeta } from '@/config/page-meta';
import type { UserRole } from '@/features/auth/types/auth';

interface AppBreadcrumbProps {
  userRole?: UserRole;
}

export function AppBreadcrumb({ userRole }: AppBreadcrumbProps) {
  const pathname = usePathname();
  const meta = getPageMeta(pathname, userRole);

  return (
    <div className='flex min-w-0 flex-col gap-0.5'>
      <h1 className='title truncate'>{meta.title}</h1>
      <p className='text-muted-foreground truncate text-sm'>{meta.subtitle}</p>
    </div>
  );
}
