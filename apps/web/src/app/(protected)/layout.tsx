import { ReactNode } from 'react';

import { AppShell } from '@/components/layout/app-shell/app-shell';
import { Toaster } from '@/components/ui/sonner';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ProtectedLayoutProps) {
  return (
    <>
      <AppShell>{children}</AppShell>
      <Toaster richColors position='top-right' />
    </>
  );
}
