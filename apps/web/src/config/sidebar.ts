// Icons
import {
  Bell,
  ChartSpline,
  CircleHelp,
  ShieldQuestionMark,
  Home,
  LogOut,
  Settings,
  Trophy,
  User,
} from 'lucide-react';
import { PiSoccerBallDuotone } from 'react-icons/pi';
import { GiTrophiesShelf } from 'react-icons/gi';
import { FaRankingStar, FaUsers  } from "react-icons/fa6";
// Types
import { SidebarItem } from '@/types/sidebar';
// Main navigation items
export const mainNav: SidebarItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Campeonatos',
    url: '/championships',
    icon: Trophy,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    title: 'Bolões',
    url: '/pools',
    icon: GiTrophiesShelf,
  },
  {
    title: 'Participantes',
    url: '/participants',
    icon: FaUsers ,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    title: 'Jogos',
    url: '/matches',
    icon: PiSoccerBallDuotone,
  },
  {
    title: 'Meus Palpites',
    url: '/predictions',
    icon: ShieldQuestionMark,
  },
  {
    title: 'Classificação',
    url: '/rankings',
    icon: FaRankingStar,
  },
  {
    title: 'Estatísticas',
    url: '/statistics',
    icon: ChartSpline,
  },
  {
    title: 'Notificações',
    url: '/notifications',
    icon: Bell,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    title: 'Perfil',
    url: '/profile',
    icon: User,
  },
];
// Secondary navigation items
export const secondaryNav: SidebarItem[] = [
  {
    title: 'Configurações',
    url: '/settings',
    icon: Settings,
    roles: ['ADMIN', 'SUPER_ADMIN'],
  },
  {
    title: 'Ajuda',
    url: '/help',
    icon: CircleHelp,
  },
  {
    title: 'Sair',
    url: '/logout',
    icon: LogOut,
  },
];
