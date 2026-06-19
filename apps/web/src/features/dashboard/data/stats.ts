import { Calendar, Trophy, Users } from 'lucide-react';
import { GiTakeMyMoney, GiSoccerBall } from 'react-icons/gi';
import { TbTargetArrow } from "react-icons/tb";

import { StatsItem } from '@/types/stats';

export const stats: StatsItem[] = [
  {
    title: 'Participantes',
    value: 12.000,
    icon: Users,
  },
  {
    title: 'Total de Jogos',
    value: 8.120,
    icon: Calendar,
  },
  {
    title: 'Bolões Ativos',
    value: 4.120,
    icon: Trophy,
  },
  {
    title: 'Valore em Premiações',
    value: 81.200,
    icon: GiTakeMyMoney,
  },
  {
    title: 'Palpites Feitos',
    value: 22.000,
    icon: TbTargetArrow,
  },
  {
    title: 'Jogos Finalizados',
    value: 1.200,
    icon: GiSoccerBall,
  },
];
