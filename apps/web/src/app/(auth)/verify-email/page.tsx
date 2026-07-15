import type { Metadata } from 'next';
import { Suspense } from 'react';

import { PageLoading } from '@/components/ui/page-loading';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { VerifyEmailForm } from '@/features/auth/components/verify-email-form';

export const metadata: Metadata = {
  title: 'Validar e-mail | Soccer Predictions',
  description: 'Confirme seu e-mail para acessar o Soccer Predictions',
};

export default function VerifyEmailPage() {
  return (
    <AuthShell>
      <Suspense fallback={<PageLoading compact label='Carregando...' />}>
        <VerifyEmailForm />
      </Suspense>
    </AuthShell>
  );
}
