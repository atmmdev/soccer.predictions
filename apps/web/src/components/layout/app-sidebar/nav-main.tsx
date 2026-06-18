import Link from 'next/link';
import { SidebarItem } from '@/types/sidebar';

interface NavMenuProps {
  items: SidebarItem[];
}

export function NavMenu({ items }: NavMenuProps) {
  return (
    <>
      {items.map(item => {
        const Icon = item.icon;
        return (
          <Link href={item.url} key={item.title}>
            <Icon size={20} />
            {item.title}
          </Link>
        );
      })}
    </>
  );
}
