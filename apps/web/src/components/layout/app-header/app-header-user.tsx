import type { UserRole } from '@/features/auth/types/auth';
import {
  getUserInitials,
  getUserRoleLabel,
} from '@/features/auth/lib/role-access';

interface AppHeaderUserProps {
  userName?: string;
  userRole?: UserRole;
}

export function AppHeaderUser({ userName, userRole }: AppHeaderUserProps) {
  const displayName = userName?.trim() || 'Usuário';
  const initials = getUserInitials(userName);
  const roleLabel = getUserRoleLabel(userRole);

  return (
    <div className='hidden items-center gap-2 sm:flex'>
      <div
        className='bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-semibold'
        aria-hidden
      >
        {initials}
      </div>
      <div className='hidden flex-col md:flex'>
        <span className='text-sm font-medium leading-none'>{displayName}</span>
        <span className='text-muted-foreground text-xs'>{roleLabel}</span>
      </div>
    </div>
  );
}
