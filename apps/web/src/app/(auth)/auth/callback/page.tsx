import { Suspense } from 'react';

import { PageLoading } from '@/components/ui/page-loading';
import { AuthShell } from '@/features/auth/components/auth-shell';
import { OAuthCallbackHandler } from '@/features/auth/components/oauth-callback-handler';

export default function OAuthCallbackPage() {
  return (
    <AuthShell>
      <Suspense
        fallback={<PageLoading compact label='Concluindo autenticação...' />}
      >
        <OAuthCallbackHandler />
      </Suspense>
    </AuthShell>
  );
}
