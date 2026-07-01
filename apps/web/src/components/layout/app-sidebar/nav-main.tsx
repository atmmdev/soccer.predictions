'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainNav, secondaryNav } from '@/config/sidebar';
import { filterSidebarItems } from '@/features/auth/lib/role-access';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarItem } from '@/types/sidebar';

const collapsedButtonClass =
  'h-11 group-data-[collapsible=icon]:size-11! group-data-[collapsible=icon]:w-11 group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:[&>span]:hidden';

function NavMenu({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname();
  const role = getStoredUser()?.role;
  const visibleItems = filterSidebarItems(items, role);

  return (
    <SidebarMenu className='group-data-[collapsible=icon]:items-center'>
      {visibleItems.map(item => {
        const Icon = item.icon;
        const isActive =
          pathname === item.url || pathname.startsWith(`${item.url}/`);

        return (
          <SidebarMenuItem
            key={item.url}
            className='group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center my-0.5'
          >
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={item.title}
              className={collapsedButtonClass}
            >
              <Link href={item.url}>
                <Icon className='size-5 shrink-0' />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function MainNav() {
  return <NavMenu items={mainNav} />;
}

export function SecondaryNav() {
  return <NavMenu items={secondaryNav} />;
}
