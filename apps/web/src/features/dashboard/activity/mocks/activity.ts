import { ActivityItem } from '../types/activity';

export const activities: ActivityItem[] = [
  {
    id: 1,
    type: 'participant',
    title: 'Novo participante cadastrado',
    description: 'João da Silva entrou no bolão Bolão Família',
    timestamp: '10 min atrás',
  },
  {
    id: 2,
    type: 'prediction',
    title: 'Novo palpite registrado',
    description: 'Carlos Eduardo registrou palpite no jogo Brasil x Argentina',
    timestamp: '25 min atrás',
  },
  {
    id: 3,
    type: 'pool',
    title: 'Bolão criado',
    description: 'Bolão Champions foi criado por Anderson Martins',
    timestamp: '1 hora atrás',
  },
  {
    id: 4,
    type: 'result',
    title: 'Resultado finalizado',
    description: 'Corinthians 2 x 1 Santos - Brasileirão 2024',
    timestamp: '2 horas atrás',
  },
];
