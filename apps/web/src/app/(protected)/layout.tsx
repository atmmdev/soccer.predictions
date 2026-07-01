import { ReactNode } from 'react';
import { cookies } from 'next/headers';

import { AppShell } from '@/components/layout/app-shell/app-shell';
import { Toaster } from '@/components/ui/sonner';
import { parseUserRole, USER_NAME_COOKIE, USER_ROLE_COOKIE } from '@/features/auth/config/auth';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: ProtectedLayoutProps) {
  const cookieStore = await cookies();
  const userRole = parseUserRole(cookieStore.get(USER_ROLE_COOKIE)?.value);
  const rawName = cookieStore.get(USER_NAME_COOKIE)?.value;
  const userName = rawName ? decodeURIComponent(rawName) : undefined;

  return (
    <>
      <AppShell userRole={userRole} userName={userName}>
        {children}
      </AppShell>
      <Toaster richColors position='top-right' />
    </>
  );
}
