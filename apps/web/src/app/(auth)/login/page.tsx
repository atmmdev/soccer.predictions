import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AuthShell } from '@/features/auth/components/auth-shell';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Entrar | Soccer Predictions',
  description: 'Acesse sua conta Soccer Predictions',
};

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense
        fallback={
          <p className='text-muted-foreground text-center text-sm'>
            Carregando...
          </p>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
