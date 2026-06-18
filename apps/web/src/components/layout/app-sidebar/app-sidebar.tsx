import { mainNav, secondaryNav } from '@/config/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

import { NavMenu } from '@/components/layout/app-sidebar/nav-main';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Logo</SidebarHeader>
      <SidebarContent>
        <NavMenu items={mainNav} />
        <NavMenu items={secondaryNav} />
      </SidebarContent>
      <SidebarFooter>User</SidebarFooter>
    </Sidebar>
  );
}
