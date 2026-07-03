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

export function canParticipateInPools(role: UserRole | undefined): boolean {
  return role !== 'SUPER_ADMIN';
}

export function getSidebarItemTitle(
  item: SidebarItem,
  role: UserRole | undefined,
): string {
  if (item.url === '/predictions' && role === 'SUPER_ADMIN') {
    return 'Palpites';
  }

  if (item.url === '/pools' && role === 'SUPER_ADMIN') {
    return 'Bolões';
  }

  return item.title;
}

export function getUserRoleLabel(role: UserRole | undefined): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'Super Administrador';
    case 'ADMIN':
      return 'Administrador';
    case 'PARTICIPANT':
      return 'Participante';
    default:
      return 'Participante';
  }
}

export function getUserInitials(name: string | undefined): string {
  if (!name?.trim()) {
    return '?';
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }

  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}
