'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { defaultBaseScoringRules } from '@/features/pools/mocks/scoring-templates';

const PREDICTION_CUTOFF_MINUTES = 10;

export function SettingsPage() {
  const user = getStoredUser();
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div className='grid gap-4 lg:grid-cols-2'>
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Regras padrão de pontuação</CardTitle>
          <CardDescription>
            Valores sugeridos ao criar um bolão. Cada admin pode personalizar no
            momento da criação.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2 text-sm'>
          <div className='flex items-center justify-between gap-4'>
            <span>Placar exato</span>
            <Badge variant='secondary'>{defaultBaseScoringRules.exactScore} pts</Badge>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span>Gols do vencedor</span>
            <Badge variant='secondary'>{defaultBaseScoringRules.winnerScore} pts</Badge>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span>Gols do perdedor</span>
            <Badge variant='secondary'>{defaultBaseScoringRules.loserScore} pts</Badge>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span>Vencedor sem placar exato</span>
            <Badge variant='secondary'>{defaultBaseScoringRules.correctWinner} pts</Badge>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <span>Empate sem placar exato</span>
            <Badge variant='secondary'>
              {defaultBaseScoringRules.drawWithoutExactScore} pts
            </Badge>
          </div>
          <p className='text-muted-foreground text-sm'>
            Palpite de jogador / hat-trick fica para uma versão futura.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Prazo de palpite</CardTitle>
          <CardDescription>
            Regra global aplicada a todos os bolões.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm'>
            Palpites podem ser enviados ou editados até{' '}
            <strong>{PREDICTION_CUTOFF_MINUTES} minutos</strong> antes do início
            da partida.
          </p>
          <p className='text-muted-foreground mt-2 text-sm'>
            Depois desse prazo, o palpite fica bloqueado. Sem palpite registrado,
            o participante não pontua na partida.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Acesso aos bolões</CardTitle>
          <CardDescription>
            Como novos participantes entram nos bolões.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2 text-sm'>
          <p>
            Usuários cadastrados pedem acesso aos bolões ativos em{' '}
            <Link href='/pools' className='text-primary underline'>
              Bolões
            </Link>
            , na aba Disponíveis.
          </p>
          <p className='text-muted-foreground'>
            Aprove ou recuse pedidos em{' '}
            <Link href='/participants' className='text-primary underline'>
              Participantes
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      {isSuperAdmin ? (
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Plataforma</CardTitle>
            <CardDescription>Configurações de super administrador.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-2 text-sm'>
            <p>
              Importação de campeonatos e sincronização de jogos dependem do token{' '}
              <code className='bg-muted rounded px-1 py-0.5 text-xs'>
                FOOTBALL_DATA_TOKEN
              </code>{' '}
              (football-data.org) no backend.
            </p>
            <p className='text-muted-foreground'>
              Campeonatos são gerenciados em{' '}
              <Link href='/championships' className='text-primary underline'>
                Campeonatos
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
