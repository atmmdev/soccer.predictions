'use client';

import { useMemo, useSyncExternalStore } from 'react';

import { UserAvatar } from '@/components/ui/user-avatar';
import {
  getStoredUserSnapshot,
  subscribeToStoredUser,
} from '@/features/auth/lib/auth-storage';
import { getUserRoleLabel } from '@/features/auth/lib/role-access';
import type { AuthUser, UserRole } from '@/features/auth/types/auth';

interface AppHeaderUserProps {
  userName?: string;
  userRole?: UserRole;
}

export function AppHeaderUser({ userName, userRole }: AppHeaderUserProps) {
  const storedUserJson = useSyncExternalStore(
    subscribeToStoredUser,
    getStoredUserSnapshot,
    () => null,
  );
  const storedUser = useMemo(() => {
    if (!storedUserJson) {
      return null;
    }

    try {
      return JSON.parse(storedUserJson) as AuthUser;
    } catch {
      return null;
    }
  }, [storedUserJson]);
  const displayName = storedUser?.name.trim() || userName?.trim() || 'Usuário';
  const roleLabel = getUserRoleLabel(storedUser?.role ?? userRole);

  return (
    <div className='hidden items-center gap-2 sm:flex'>
      <UserAvatar
        name={displayName}
        avatarDataUrl={storedUser?.avatarDataUrl}
        className='size-9'
        fallbackClassName='bg-primary text-primary-foreground font-semibold'
      />
      <div className='hidden flex-col md:flex'>
        <span className='text-sm font-medium leading-none'>{displayName}</span>
        <span className='text-muted-foreground text-xs'>{roleLabel}</span>
      </div>
    </div>
  );
}
