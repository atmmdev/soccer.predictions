import { mainNav, secondaryNav } from '@/config/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

import { NavMenu } from '@/components/layout/app-sidebar/nav-main';
import { AppLogo } from './app-logo';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={mainNav} />
        <NavMenu items={secondaryNav} />
      </SidebarContent>
      <SidebarFooter>User</SidebarFooter>
    </Sidebar>
  );
}
