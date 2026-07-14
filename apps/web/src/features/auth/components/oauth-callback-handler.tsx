'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { PageLoading } from '@/components/ui/page-loading';
import { saveAuthSession } from '@/features/auth/lib/auth-storage';
import { fetchMeRequest } from '@/features/auth/services/auth.service';

export function OAuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('Concluindo autenticação...');

  useEffect(() => {
    async function completeOAuth() {
      const error = searchParams.get('error');
      const accessToken = searchParams.get('accessToken');

      if (error) {
        toast.error(error);
        router.replace('/login');
        return;
      }

      if (!accessToken) {
        toast.error('Token de autenticação não encontrado');
        router.replace('/login');
        return;
      }

      try {
        const user = await fetchMeRequest(accessToken);
        saveAuthSession(accessToken, user);
        toast.success('Login realizado com sucesso!');
        router.replace('/dashboard');
      } catch {
        setMessage('Não foi possível concluir o login');
        toast.error('Não foi possível concluir o login social');
        router.replace('/login');
      }
    }

    void completeOAuth();
  }, [router, searchParams]);

  return <PageLoading compact label={message} />;
}
