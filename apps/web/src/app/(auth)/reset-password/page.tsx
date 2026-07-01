import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AuthShell } from '@/features/auth/components/auth-shell';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

export const metadata: Metadata = {
  title: 'Redefinir senha | Soccer Predictions',
  description: 'Defina uma nova senha para sua conta',
};

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <Suspense
        fallback={
          <p className='text-muted-foreground text-center text-sm'>
            Carregando...
          </p>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
