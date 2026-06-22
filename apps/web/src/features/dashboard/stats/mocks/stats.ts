import { Calendar, Trophy, Users } from 'lucide-react';
import { GiTakeMyMoney, GiSoccerBall } from 'react-icons/gi';
import { TbTargetArrow } from 'react-icons/tb';

import { StatsItem } from '@/features/dashboard/stats/types/stats';

export const stats: StatsItem[] = [
  {
    title: 'Participantes',
    value: 12.0,
    icon: Users,
    iconBackground: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    title: 'Total de Jogos',
    value: 8.12,
    icon: Calendar,
    iconBackground: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
  },
  {
    title: 'Bolões Ativos',
    value: 4.12,
    icon: Trophy,
    iconBackground: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Valore em Premiações',
    value: 81.2,
    icon: GiTakeMyMoney,
    iconBackground: 'bg-lime-100',
    iconColor: 'text-lime-500',
  },
  {
    title: 'Palpites Feitos',
    value: 22.0,
    icon: TbTargetArrow,
    iconBackground: 'bg-red-100',
    iconColor: 'text-red-500',
  },
  {
    title: 'Jogos Finalizados',
    value: 1.2,
    icon: GiSoccerBall,
    iconBackground: 'bg-mist-100',
    iconColor: 'text-mist-500',
  },
];
