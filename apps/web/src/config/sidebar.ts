// Icons
import {
  Bell,
  CircleHelp,
  Home,
  LogOut,
  Settings,
  Trophy,
  User,
  BarChart2,
  ClipboardList,
  Goal,
} from 'lucide-react';
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
  },
  {
    title: 'Bolões',
    url: '/pools',
    icon: Trophy,
  },
  {
    title: 'Jogos',
    url: '/matches',
    icon: Goal,
  },
  {
    title: 'Meus Palpites',
    url: '/predictions',
    icon: ClipboardList,
  },
  {
    title: 'Ranking',
    url: '/rankings',
    icon: BarChart2,
  },
  {
    title: 'Estatísticas',
    url: '/statistics',
    icon: BarChart2,
  },
  {
    title: 'Notificações',
    url: '/notifications',
    icon: Bell,
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
