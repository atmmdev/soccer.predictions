import type { Metadata } from 'next';
import { Suspense } from 'react';

import { PageLoading } from '@/components/ui/page-loading';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

export const metadata: Metadata = {
  title: 'Redefinir senha | Soccer Predictions',
  description: 'Defina uma nova senha para sua conta',
};

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <Suspense fallback={<PageLoading compact label='Carregando...' />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
