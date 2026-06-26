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
