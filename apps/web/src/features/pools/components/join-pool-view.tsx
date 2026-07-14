'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { PageLoading } from '@/components/ui/page-loading';
import { getFetchErrorMessage } from '@/lib/api-client';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { canParticipateInPools } from '@/features/auth/lib/role-access';

import { joinPoolRequest } from '../services/pool-api.service';

type JoinState = 'joining' | 'success' | 'error';

export function JoinPoolView() {
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const inviteCode = params.code?.trim().toUpperCase() ?? '';
  const isSuperAdmin = !canParticipateInPools(getStoredUser()?.role);
  const [state, setState] = useState<JoinState>('joining');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!inviteCode || isSuperAdmin) {
      return;
    }

    let cancelled = false;

    async function joinPool() {
      setState('joining');
      setErrorMessage(null);

      try {
        const pool = await joinPoolRequest(inviteCode);

        if (cancelled) {
          return;
        }

        setState('success');
        toast.success(`Você entrou no bolão "${pool.name}"!`);
        router.replace('/pools');
      } catch (joinError) {
        if (cancelled) {
          return;
        }

        const message = getFetchErrorMessage(
          joinError,
          'Não foi possível entrar no bolão.',
        );
        setErrorMessage(message);
        setState('error');
        toast.error(message);
      }
    }

    void joinPool();

    return () => {
      cancelled = true;
    };
  }, [inviteCode, isSuperAdmin, router, retryCount]);

  if (isSuperAdmin) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-16 text-center'>
        <p className='text-muted-foreground max-w-md text-sm'>
          Super administradores não participam de bolões. Você pode criar um
          bolão e compartilhar o código de convite com os participantes.
        </p>
        <Button type='button' onClick={() => router.push('/pools')}>
          Ir para bolões
        </Button>
      </div>
    );
  }

  if (!inviteCode) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-16 text-center'>
        <p className='text-destructive text-sm'>Código de convite inválido.</p>
        <Button type='button' onClick={() => router.push('/pools')}>
          Ir para bolões
        </Button>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-16 text-center'>
        <p className='text-destructive text-sm'>{errorMessage}</p>
        <div className='flex flex-wrap justify-center gap-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push('/pools')}
          >
            Ver meus bolões
          </Button>
          <Button type='button' onClick={() => setRetryCount(count => count + 1)}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PageLoading
      label={
        state === 'success'
          ? 'Redirecionando para seus bolões...'
          : `Entrando no bolão com código ${inviteCode}...`
      }
    />
  );
}
