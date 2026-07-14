import type { UserRole } from '@/features/auth/types/auth';

export interface PageMeta {
  title: string;
  subtitle: string;
}

export const pageMeta: Record<string, PageMeta> = {
  '/dashboard': {
    title: 'Dashboard',
    subtitle: 'Visão geral da administração dos bolões',
  },
  '/championships': {
    title: 'Campeonatos',
    subtitle: 'Gerencie os campeonatos disponíveis',
  },
  '/pools': {
    title: 'Bolões',
    subtitle: 'Crie e gerencie seus bolões',
  },
  '/participants': {
    title: 'Participantes',
    subtitle:
      'Gerencie quem participa dos seus bolões — cada linha é uma pessoa em um bolão',
  },
  '/matches': {
    title: 'Jogos',
    subtitle: 'Acompanhe os confrontos dos campeonatos',
  },
  '/predictions': {
    title: 'Meus Palpites',
    subtitle: 'Registre e revise seus palpites',
  },
  '/rankings': {
    title: 'Ranking',
    subtitle: 'Classificação dos participantes',
  },
  '/statistics': {
    title: 'Estatísticas',
    subtitle: 'Análise de desempenho',
  },
  '/notifications': {
    title: 'Notificações',
    subtitle: 'Alertas e atualizações',
  },
  '/profile': {
    title: 'Perfil',
    subtitle: 'Seus dados e preferências',
  },
  '/settings': {
    title: 'Configurações',
    subtitle: 'Ajustes do sistema',
  },
  '/help': {
    title: 'Ajuda',
    subtitle: 'Suporte e perguntas frequentes',
  },
};

export const defaultPageMeta: PageMeta = {
  title: 'Soccer Predictions',
  subtitle: 'Bolões de futebol',
};

export function getPageMeta(pathname: string, role?: UserRole): PageMeta {
  const base = pageMeta[pathname] ?? defaultPageMeta;

  if (pathname === '/predictions' && role === 'SUPER_ADMIN') {
    return {
      title: 'Palpites',
      subtitle: 'Palpites de todos os participantes nos bolões',
    };
  }

  if (pathname === '/pools' && role === 'SUPER_ADMIN') {
    return {
      title: 'Bolões',
      subtitle: 'Crie e administre bolões na plataforma',
    };
  }

  return base;
}
