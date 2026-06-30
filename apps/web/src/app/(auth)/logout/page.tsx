'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { clearAuthSession } from '@/features/auth/lib/auth-storage';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    clearAuthSession();
    router.replace('/login');
  }, [router]);

  return (
    <div className='text-muted-foreground flex min-h-dvh items-center justify-center text-sm'>
      Saindo...
    </div>
  );
}
