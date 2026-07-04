'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LogOut, Shield, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAccessToken } from '@/features/auth/lib/auth-storage';
import { fetchMeRequest } from '@/features/auth/services/auth.service';
import type { AuthUser, UserRole } from '@/features/auth/types/auth';
import { getFetchErrorMessage } from '@/lib/api-client';

const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super administrador',
  ADMIN: 'Administrador',
  PARTICIPANT: 'Participante',
};

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className='space-y-1'>
      <p className='text-muted-foreground text-xs font-medium uppercase tracking-wide'>
        {label}
      </p>
      <p className='text-sm'>{value}</p>
    </div>
  );
}

export function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    void fetchMeRequest(token)
      .then(setUser)
      .catch(loadError => {
        setError(
          getFetchErrorMessage(loadError, 'Não foi possível carregar o perfil.'),
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm'>Carregando perfil...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <Card>
        <CardContent className='py-12 text-center'>
          <p className='text-destructive text-sm'>
            {error ?? 'Perfil indisponível.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
      <Card>
        <CardHeader>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full'>
              <UserRound className='size-6' />
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className='grid gap-4 sm:grid-cols-2'>
          <ProfileField label='Nome' value={user.name} />
          <ProfileField label='E-mail' value={user.email} />
          <ProfileField label='Papel' value={ROLE_LABELS[user.role]} />
          <ProfileField
            label='Conta'
            value='Sessão ativa neste navegador'
          />
        </CardContent>
      </Card>

      <div className='flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Permissões</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Shield className='text-muted-foreground size-4' />
              <Badge>{ROLE_LABELS[user.role]}</Badge>
            </div>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {user.role === 'SUPER_ADMIN'
                ? 'Acesso total à plataforma, incluindo campeonatos e bolões de todos os usuários.'
                : user.role === 'ADMIN'
                  ? 'Você gerencia os bolões que criou, convida participantes e acompanha palpites.'
                  : 'Você participa dos bolões em que foi convidado e registra palpites nos jogos.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Conta</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-muted-foreground text-sm'>
              Atualizado em{' '}
              {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}.
            </p>
            <Button asChild variant='outline' className='w-full'>
              <Link href='/logout'>
                <LogOut className='size-4' />
                Sair da conta
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
