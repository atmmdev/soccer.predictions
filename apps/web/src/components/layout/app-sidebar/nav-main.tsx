import Link from 'next/link';
import { SidebarItem } from '@/types/sidebar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavMenuProps {
  items: SidebarItem[];
}

export function NavMenu({ items }: NavMenuProps) {
  return (
    <SidebarMenu>
      {items.map(item => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton asChild>
              <Link href={item.url} key={item.title}>
                <Icon size={20} />
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
