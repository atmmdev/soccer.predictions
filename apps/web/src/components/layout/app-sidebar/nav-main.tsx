'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainNav, secondaryNav } from '@/config/sidebar';
import { filterSidebarItems, getSidebarItemTitle } from '@/features/auth/lib/role-access';
import type { UserRole } from '@/features/auth/types/auth';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarItem } from '@/types/sidebar';

const collapsedButtonClass =
  'h-11 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:[&>span]:hidden';

interface NavMenuProps {
  items: SidebarItem[];
  userRole?: UserRole;
}

function NavMenu({ items, userRole }: NavMenuProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const visibleItems = filterSidebarItems(items, userRole);

  function handleNavigate() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <SidebarMenu className='group-data-[collapsible=icon]:items-center'>
      {visibleItems.map(item => {
        const Icon = item.icon;
        const isActive =
          pathname === item.url || pathname.startsWith(`${item.url}/`);

        const label = getSidebarItemTitle(item, userRole);

        return (
          <SidebarMenuItem
            key={item.url}
            className='group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center my-0.5'
          >
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={label}
              className={collapsedButtonClass}
            >
              <Link href={item.url} onClick={handleNavigate}>
                <Icon className='size-5 shrink-0' />
                <span>{label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function MainNav({ userRole }: { userRole?: UserRole }) {
  return <NavMenu items={mainNav} userRole={userRole} />;
}

export function SecondaryNav({ userRole }: { userRole?: UserRole }) {
  return <NavMenu items={secondaryNav} userRole={userRole} />;
}
