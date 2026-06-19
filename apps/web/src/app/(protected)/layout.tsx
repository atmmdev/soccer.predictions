import { ReactNode } from 'react';

import { AppShell } from '@/components/layout/app-shell/app-shell';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ProtectedLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
