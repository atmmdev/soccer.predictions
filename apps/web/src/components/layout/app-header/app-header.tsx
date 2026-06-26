import { SidebarTrigger } from '@/components/ui/sidebar';

import { AppBreadcrumb } from './app-breadcrumb';
import { AppHeaderSearch } from './app-header-search';
import { AppHeaderUser } from './app-header-user';
import { NotificationButton } from './notification-button';

export function AppHeader() {
  return (
    <header className='flex h-auto min-h-16 shrink-0 items-center border-b bg-card px-4 py-3 md:px-6'>
      <div className='flex w-full items-center gap-3 md:gap-4'>
        <div className='flex min-w-0 items-center gap-2'>
          <SidebarTrigger
            className='size-11 shrink-0'
            aria-label='Alternar menu lateral'
          />
          <AppBreadcrumb />
        </div>

        <AppHeaderSearch />

        <div className='ml-auto flex items-center gap-2'>
          <NotificationButton />
          <AppHeaderUser />
        </div>
      </div>
    </header>
  );
}
