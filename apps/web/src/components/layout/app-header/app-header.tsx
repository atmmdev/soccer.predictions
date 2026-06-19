import { SidebarTrigger } from '@/components/ui/sidebar';

import { AppBreadcrumb } from './app-breadcrumb';
import { NotificationButton } from './notification-button';

export function AppHeader() {
  return (
    <header className='flex items-center h-16 px-4 bg-white border-b'>
      <div className='flex items-center w-full gap-4'>
        <SidebarTrigger />
        <AppBreadcrumb />

        <div className='ml-auto'>
          <NotificationButton />
        </div>
      </div>
    </header>
  );
}
