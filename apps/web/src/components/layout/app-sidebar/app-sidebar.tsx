import { mainNav, secondaryNav } from '@/config/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

import { AppLogo } from './app-logo';
import { NavMenu } from './nav-main';
import { NavUser } from './nav-user';

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
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
