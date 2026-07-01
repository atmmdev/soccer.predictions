import type { UserRole } from '@/features/auth/types/auth';

export interface SidebarItem {
  title: string;
  url: string;
  icon: React.ElementType;
  roles?: UserRole[];
}