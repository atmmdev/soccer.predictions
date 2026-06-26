import { Calendar, Target, Trophy, Users } from 'lucide-react';
import { TbPercentage } from 'react-icons/tb';

import { StatsItem } from '@/features/dashboard/stats/types/stats';

export const stats: StatsItem[] = [
  {
    title: 'Total de Participantes',
    value: '1.248',
    trend: '+12% vs. mês anterior',
    trendPositive: true,
    icon: Users,
    iconBackground: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Bolões Ativos',
    value: '32',
    trend: '+3 novos esta semana',
    trendPositive: true,
    icon: Trophy,
    iconBackground: 'bg-sky-100',
    iconColor: 'text-sky-600',
  },
  {
    title: 'Jogos Hoje',
    value: '8',
    trend: '3 em andamento',
    icon: Calendar,
    iconBackground: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    title: 'Palpites Registrados',
    value: '2.156',
    trend: '+18% vs. semana passada',
    trendPositive: true,
    icon: Target,
    iconBackground: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    title: 'Média de Acertos',
    value: '43%',
    trend: '+5% vs. mês anterior',
    trendPositive: true,
    icon: TbPercentage,
    iconBackground: 'bg-rose-100',
    iconColor: 'text-rose-600',
  },
];
