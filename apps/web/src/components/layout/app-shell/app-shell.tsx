import { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { UserRole } from '@/features/auth/types/auth';
import { AppFooter } from '../app-footer/app-footer';
import { AppHeader } from '../app-header/app-header';
import { AppSidebar } from '../app-sidebar/app-sidebar';

interface AppShellProps {
  children: ReactNode;
  userRole?: UserRole;
  userName?: string;
}

export function AppShell({ children, userRole, userName }: AppShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar userRole={userRole} />
        <SidebarInset className='bg-background flex min-h-svh min-w-0 flex-col overflow-x-hidden'>
          <AppHeader userName={userName} userRole={userRole} />
          <main className='min-w-0 flex-1 px-4 py-4 md:px-6 md:py-6'>{children}</main>
          <div className='py-4 md:px-6'>
            <AppFooter />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
