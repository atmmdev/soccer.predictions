import type { Metadata } from 'next';
import { Suspense } from 'react';

import { PageLoading } from '@/components/ui/page-loading';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Entrar | Soccer Predictions',
  description: 'Acesse sua conta Soccer Predictions',
};

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<PageLoading compact label='Carregando...' />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
