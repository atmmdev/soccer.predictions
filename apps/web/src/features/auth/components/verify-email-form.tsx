'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { PageLoading } from '@/components/ui/page-loading';

import { saveAuthSession } from '../lib/auth-storage';
import { verifyEmailRequest } from '../services/auth.service';

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Link de validação incompleto.');
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const response = await verifyEmailRequest(token!);
        if (cancelled) {
          return;
        }
        saveAuthSession(response.accessToken, response.user);
        setStatus('success');
        toast.success('E-mail validado com sucesso!');
        router.replace('/dashboard');
      } catch (error) {
        if (cancelled) {
          return;
        }
        setStatus('error');
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Não foi possível validar o e-mail',
        );
      }
    }

    void verify();

    return () => {
      cancelled = true;
    };
  }, [token, router]);

  if (status === 'loading') {
    return <PageLoading compact label='Validando e-mail...' />;
  }

  if (status === 'success') {
    return (
      <div className='space-y-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>E-mail validado</h1>
        <p className='text-muted-foreground text-sm'>
          Redirecionando para o painel...
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Não foi possível validar
        </h1>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {errorMessage}
        </p>
      </div>

      <Button asChild size='lg' className='h-11 w-full'>
        <Link href='/login'>Ir para entrar</Link>
      </Button>
    </div>
  );
}
