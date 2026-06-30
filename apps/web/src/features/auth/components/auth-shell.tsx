import type { ReactNode } from 'react';

import { BrandLogo } from '@/components/brand/brand-logo';

import { AuthBrandPanel } from './auth-brand-panel';
import { AuthLegalFooter } from './auth-legal-footer';

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className='bg-muted flex min-h-dvh w-full flex-col items-center justify-center px-4 py-6'>
      <div className='border-border bg-card w-full max-w-4xl overflow-hidden rounded-2xl border shadow-sm'>
        <div className='grid min-h-[min(560px,calc(100dvh-8rem))] lg:grid-cols-2'>
          <div className='flex flex-col justify-center p-6 sm:p-10'>
            <BrandLogo className='mb-8 lg:hidden' priority />
            {children}
          </div>
          <AuthBrandPanel />
        </div>
      </div>

      <AuthLegalFooter />
    </div>
  );
}
