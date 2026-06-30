import { Suspense } from 'react';

import { AuthShell } from '@/features/auth/components/auth-shell';
import { OAuthCallbackHandler } from '@/features/auth/components/oauth-callback-handler';

export default function OAuthCallbackPage() {
  return (
    <AuthShell>
      <Suspense
        fallback={
          <p className='text-muted-foreground text-center text-sm'>
            Concluindo autenticação...
          </p>
        }
      >
        <OAuthCallbackHandler />
      </Suspense>
    </AuthShell>
  );
}
