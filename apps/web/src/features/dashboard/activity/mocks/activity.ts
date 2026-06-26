import { ActivityItem } from '../types/activity';

export const activities: ActivityItem[] = [
  {
    id: 1,
    type: 'participant',
    message: 'Novo participante cadastrado: Maria Silva',
    timestamp: '10 min atrás',
  },
  {
    id: 2,
    type: 'pool',
    message: 'Bolão "Champions 2026" criado por Anderson',
    timestamp: '25 min atrás',
  },
  {
    id: 3,
    type: 'prediction',
    message: 'Pedro registrou palpite: Flamengo 2 x 1 Palmeiras',
    timestamp: '1 h atrás',
  },
  {
    id: 4,
    type: 'match',
    message: 'Resultado atualizado: São Paulo 1 x 0 Corinthians',
    timestamp: '2 h atrás',
  },
  {
    id: 5,
    type: 'ranking',
    message: 'Carlos subiu para 3º lugar no ranking geral',
    timestamp: '3 h atrás',
  },
];
