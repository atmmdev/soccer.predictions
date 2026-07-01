import type { UserRole } from '@/features/auth/types/auth';
import { isPrivilegedRole } from '@/features/auth/config/auth';
import type { SidebarItem } from '@/types/sidebar';

export function filterSidebarItems(
  items: SidebarItem[],
  role: UserRole | undefined,
): SidebarItem[] {
  return items.filter(item => {
    if (!item.roles?.length) {
      return true;
    }

    if (!role) {
      return false;
    }

    return item.roles.includes(role);
  });
}

export function canManagePlatform(role: UserRole | undefined): boolean {
  return isPrivilegedRole(role);
}
