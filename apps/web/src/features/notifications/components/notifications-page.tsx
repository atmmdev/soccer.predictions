'use client';

import { Bell, CalendarClock, Trophy } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const PLANNED_NOTIFICATIONS = [
  {
    icon: CalendarClock,
    title: 'Prazo de palpite',
    description:
      'Aviso quando um jogo estiver perto de fechar para palpites (10 minutos antes).',
  },
  {
    icon: Trophy,
    title: 'Resultado da rodada',
    description:
      'Resumo de pontos conquistados após jogos finalizados do seu bolão.',
  },
  {
    icon: Bell,
    title: 'Novos participantes',
    description:
      'Notificação quando alguém entrar em um bolão que você administra.',
  },
] as const;

export function NotificationsPage() {
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle className='text-base'>Central de notificações</CardTitle>
          <CardDescription>
            Você ainda não possui alertas. As notificações automáticas serão
            habilitadas em uma próxima versão.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            Por enquanto, acompanhe jogos, palpites e classificação diretamente no
            dashboard e nas telas do menu. Nenhuma ação pendente requer sua
            atenção aqui.
          </p>
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-3'>
        {PLANNED_NOTIFICATIONS.map(item => (
          <Card key={item.title}>
            <CardHeader className='space-y-3'>
              <div className='bg-muted flex size-10 items-center justify-center rounded-lg'>
                <item.icon className='text-muted-foreground size-5' />
              </div>
              <div>
                <CardTitle className='text-base'>{item.title}</CardTitle>
                <CardDescription className='mt-2'>
                  {item.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground text-xs uppercase tracking-wide'>
                Em breve
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
