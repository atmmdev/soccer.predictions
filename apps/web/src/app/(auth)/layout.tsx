import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='min-h-dvh w-full'>
      {children}
      <Toaster richColors position='top-right' />
    </div>
  );
}
