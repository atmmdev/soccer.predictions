import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../app-sidebar/app-sidebar';
import { AppHeader } from '../app-header/app-header';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className='px-6 py-4'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
