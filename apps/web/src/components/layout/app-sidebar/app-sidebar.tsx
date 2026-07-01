'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { AppLogo } from './app-logo';
import { MainNav, SecondaryNav } from './nav-main';
import type { UserRole } from '@/features/auth/types/auth';

interface AppSidebarProps {
  userRole?: UserRole;
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='border-sidebar-border border-b px-4 py-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3'>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent className='px-2 py-2 group-data-[collapsible=icon]:px-1'>
        <SidebarGroup className='group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-1'>
          <SidebarGroupContent className='group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center'>
            <MainNav userRole={userRole} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className='group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:p-1'>
          <SidebarGroupLabel className='text-sidebar-foreground/60 px-2 text-xs font-semibold uppercase tracking-wider'>
            Outros
          </SidebarGroupLabel>
          <SidebarGroupContent className='group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center'>
            <SecondaryNav userRole={userRole} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
