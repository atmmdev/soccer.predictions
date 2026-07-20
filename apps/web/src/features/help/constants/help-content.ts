import {
  defaultBaseScoringRules,
  defaultCupPhaseRules,
} from '@/features/pools/mocks/scoring-templates';
import { PREDICTION_CUTOFF_MINUTES } from '@/features/predictions/constants/prediction-cutoff';

export const HELP_SECTIONS = [
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'passo-a-passo', label: 'Passo a passo' },
  { id: 'regras-palpite', label: 'Regras de palpite' },
  { id: 'pontuacao', label: 'Pontuação' },
  { id: 'exemplos', label: 'Exemplos' },
  { id: 'copas', label: 'Campeonatos mata-mata' },
  { id: 'duvidas', label: 'Perguntas frequentes' },
] as const;

export const HOW_IT_WORKS = {
  title: 'Como funciona o Soccer Predictions',
  paragraphs: [
    'O Soccer Predictions é uma plataforma de bolões de futebol. Campeonatos reais são importados; participantes entram em bolões, registram palpites de placar e competem na classificação.',
    'Cada bolão tem regras de pontuação próprias, definidas na criação (e editáveis pelo administrador). Os valores desta página são os padrões do sistema.',
    'Os placares oficiais são atualizados automaticamente. Quando o jogo termina, os pontos são calculados e a classificação é atualizada.',
  ],
};

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Crie sua conta',
    description:
      'Cadastre-se com e-mail e senha e confirme o e-mail pelo link enviado. Depois disso, será direcionado ao dashboard do sistema.',
  },
  {
    step: 2,
    title: 'Entre ou crie um bolão',
    description:
      'Peça acesso a um bolão ativo na aba Disponíveis ou crie o seu. Na criação, você pode importar o campeonato na hora se ainda não houver nenhum.',
  },
  {
    step: 3,
    title: 'Registre seus palpites',
    description:
      'Em Meus Palpites, escolha o bolão e informe o placar de cada partida. Use os filtros (status, data do jogo, busca) para achar os jogos.',
  },
  {
    step: 4,
    title: 'Acompanhe os resultados',
    description:
      'Quando o jogo termina, seus pontos aparecem em Meus Palpites e na Classificação. No Dashboard, a Atividade Recente destaca novidades ainda não vistas.',
  },
  {
    step: 5,
    title: 'Dispute a classificação',
    description:
      'Quem acumular mais pontos no bolão fica na frente. Em empate de pontos, vence quem tiver mais placares exatos; se ainda empatar, ordem alfabética pelo nome.',
  },
];

export const PREDICTION_RULES = [
  {
    title: 'Prazo para palpitar',
    description: `Você pode enviar ou editar um palpite até ${PREDICTION_CUTOFF_MINUTES} minutos antes do horário de início da partida. Após esse prazo, o palpite fica bloqueado.`,
  },
  {
    title: 'Placar obrigatório',
    description:
      'Informe quantos gols cada time marcará. O palpite considera mandante × visitante (ex.: 2 × 1). Nesta versão não há palpite de jogador artilheiro.',
  },
  {
    title: 'Sem palpite, sem pontos',
    description:
      'Se você não registrar seu palpite antes do prazo, não pontua naquela partida.',
  },
  {
    title: 'Visibilidade dos outros',
    description: `Os palpites dos demais participantes ficam ocultos enquanto o prazo estiver aberto. Depois que o prazo encerra (${PREDICTION_CUTOFF_MINUTES} min antes do jogo), todos podem ver. O seu palpite você sempre vê.`,
  },
];

export const SCORING_RULES = [
  {
    key: 'exactScore',
    label: 'Placar exato',
    points: defaultBaseScoringRules.exactScore,
    description: 'Acertou o placar completo (gols do mandante e do visitante).',
  },
  {
    key: 'winnerScore',
    label: 'Placar do vencedor',
    points: defaultBaseScoringRules.winnerScore,
    description:
      'Sem placar exato, mas acertou quantos gols fez o time vencedor.',
  },
  {
    key: 'loserScore',
    label: 'Placar do perdedor',
    points: defaultBaseScoringRules.loserScore,
    description:
      'Sem placar exato, mas acertou quantos gols fez o time perdedor.',
  },
  {
    key: 'correctWinner',
    label: 'Vitória do time vencedor sem placar exato',
    points: defaultBaseScoringRules.correctWinner,
    description:
      'Acertou quem venceu, mas errou os gols de ambos os lados.',
  },
  {
    key: 'drawWithoutExactScore',
    label: 'Empate sem placar exato',
    points: defaultBaseScoringRules.drawWithoutExactScore,
    description:
      'Resultado oficial e palpite são empates, mas com placares diferentes (ex.: 3×3 oficial e 1×1 no palpite).',
  },
];

export const SCORING_EVALUATION_ORDER = [
  'Placar exato — se acertou, não soma regras parciais de vencedor ou empate.',
  'Gols do vencedor e do perdedor — quando não é placar exato, mas os gols de cada lado batem.',
  'Vencedor ou empate — quando acertou o resultado, mas errou os gols.',
  'Em copas, multiplicador da fase sobre o total de pontos da partida.',
];

export const SCORING_EXAMPLES = [
  {
    id: 'exact-score',
    title: 'Placar exato',
    result: 'Flamengo 2 × 1 Palmeiras',
    prediction: '2 × 1',
    breakdown: ['Placar exato: 10 pts'],
    total: 10,
    note: 'Acertou tudo. Não soma pontos parciais de vencedor ou perdedor.',
  },
  {
    id: 'winner-score',
    title: 'Gols do vencedor',
    result: 'Arsenal 2 × 1 Chelsea',
    prediction: '2 × 0',
    breakdown: ['Placar do vencedor (Arsenal 2 gols): 6 pts'],
    total: 6,
    note: 'Mandante venceu e você acertou os 2 gols dele, mas errou os gols do Chelsea.',
  },
  {
    id: 'loser-score',
    title: 'Gols do perdedor',
    result: 'Real Madrid 3 × 1 Barcelona',
    prediction: '1 × 1',
    breakdown: ['Placar do perdedor (Barcelona 1 gol): 4 pts'],
    total: 4,
    note: 'Errou o vencedor e o placar, mas acertou que o Barcelona marcaria 1 gol.',
  },
  {
    id: 'correct-winner',
    title: 'Vencedor correto',
    result: 'Liverpool 3 × 0 Man City',
    prediction: '1 × 0',
    breakdown: ['Vitória vencedor: 3 pts'],
    total: 3,
    note: 'Acertou que o Liverpool venceria, mas errou a quantidade de gols.',
  },
  {
    id: 'draw-without-exact-score',
    title: 'Empate sem placar exato',
    result: 'Flamengo 3 × 3 Palmeiras',
    prediction: '1 × 1',
    breakdown: ['Empate sem placar exato: 3 pts'],
    total: 3,
    note: 'Acertou que seria empate, mas errou o placar exato.',
  },
  {
    id: 'wrong-result',
    title: 'Resultado errado',
    result: 'PSG 0 × 2 Bayern',
    prediction: '2 × 1',
    breakdown: ['Nenhuma regra de placar aplicada: 0 pts'],
    total: 0,
    note: 'Errou vencedor e gols — não pontua nesta partida.',
  },
  {
    id: 'cup-multiplier',
    title: 'Multiplicador de copa (semi-final)',
    result: 'Espanha 2 × 1 Itália — Semi-final',
    prediction: '2 × 1',
    breakdown: [
      'Placar exato: 10 pts',
      'Multiplicador semi-final (×5): 50 pts',
    ],
    total: 50,
    note: 'Em campeonatos mata-mata, o total da partida é multiplicado pela fase.',
  },
];

export const CUP_PHASE_MULTIPLIERS = defaultCupPhaseRules.map(phase => ({
  phase: phase.label,
  multiplier: phase.multiplier,
}));

export const FAQ_ITEMS = [
  {
    id: 'faq-deadline',
    question: 'Até quando posso alterar meu palpite?',
    answer: `Até ${PREDICTION_CUTOFF_MINUTES} minutos antes do horário oficial de início da partida. Depois disso, o sistema bloqueia criação e edição. Confira o prazo em Meus Palpites.`,
  },
  {
    id: 'faq-no-prediction',
    question: 'Esqueci de palpitar. Posso pontuar mesmo assim?',
    answer:
      'Não. Sem palpite registrado antes do prazo, você recebe 0 pontos naquela partida, independentemente do resultado real.',
  },
  {
    id: 'faq-others-predictions',
    question: 'Quando posso ver os palpites dos outros?',
    answer: `Somente depois que o prazo de palpite encerrar (${PREDICTION_CUTOFF_MINUTES} minutos antes do jogo). Antes disso, os placares alheios ficam ocultos (anti-spoiler). O seu você sempre vê. Use “Ver palpites” em Meus Palpites.`,
  },
  {
    id: 'faq-multiple-pools',
    question: 'Posso participar de mais de um bolão?',
    answer:
      'Sim. Cada bolão tem classificação e regras independentes. Você palpita separadamente em cada um, mesmo quando os jogos são os mesmos.',
  },
  {
    id: 'faq-scoring-diff',
    question: 'Por que meu amigo ganhou pontos diferentes no mesmo jogo?',
    answer:
      'Cada bolão pode ter regras de pontuação diferentes, definidas pelo administrador. Verifique as regras do bolão em Bolões ou pergunte ao admin.',
  },
  {
    id: 'faq-exact-vs-partial',
    question: 'Acertei o placar exato e também o vencedor. Soma os dois?',
    answer:
      'Não. Placar exato é exclusivo — quando você acerta o placar completo, não soma pontos parciais de vencedor, perdedor ou empate.',
  },
  {
    id: 'faq-player-prediction',
    question: 'Posso escolher um jogador para marcar gol?',
    answer:
      'Ainda não. Nesta versão o palpite é só de placar. Palpite de jogador e bônus de hat-trick ficam para uma atualização futura.',
  },
  {
    id: 'faq-ranking',
    question: 'Como a classificação é calculada?',
    answer:
      'A classificação soma todos os pontos que você ganhou em cada partida do bolão. Quem tiver mais pontos fica na frente. Em empate de pontos, quem tiver mais placares exatos fica à frente. Se ainda empatar, a ordem é alfabética pelo nome.',
  },
  {
    id: 'faq-zero-points',
    question: 'No início, com todos em 0 pontos, como fica a ordem?',
    answer:
      'Com todos em 0 pontos (e sem placares exatos), a lista segue ordem alfabética do nome (A → Z). As posições mudam conforme os jogos forem pontuando.',
  },
  {
    id: 'faq-live',
    question: 'Os pontos aparecem durante o jogo ao vivo?',
    answer:
      'Não. A pontuação é calculada quando a partida é finalizada (status “Encerrado”). Durante o jogo você vê seu palpite, mas os pontos só aparecem após o apito final.',
  },
  {
    id: 'faq-invite',
    question: 'Como entro em um bolão?',
    answer:
      'Em Bolões, abra a aba Disponíveis e solicite acesso a um bolão ativo. O administrador aprova o pedido em Participantes. Você também pode criar o seu (ao criar o primeiro, você vira administrador).',
  },
  {
    id: 'faq-create-pool-import',
    question: 'Não tem campeonato na lista ao criar bolão. O que faço?',
    answer:
      'No dialog Criar Bolão, use “Importar campeonato”: escolha país, liga e temporada. O campeonato é importado e já fica selecionado para o bolão.',
  },
  {
    id: 'faq-admin-scoring',
    question: 'Sou administrador. Posso mudar as regras depois de criar o bolão?',
    answer:
      'Sim. Em Bolões, edite o bolão para alterar nome e regras de pontuação, desde que ele não esteja encerrado. Avise os participantes se mudar as regras no meio da disputa.',
  },
  {
    id: 'faq-filters',
    question: 'Como filtro meus jogos em Meus Palpites?',
    answer:
      'Selecione o bolão e use busca por time/campeonato, status do jogo, status do palpite (com ou sem palpite) e data do jogo. “Limpar filtros” zera tudo.',
  },
  {
    id: 'faq-activity',
    question: 'O que é a Atividade Recente no Dashboard?',
    answer:
      'É um resumo de novidades dos seus bolões (entradas, palpites, resultados etc.). Itens novos aparecem com badge “Nova”. Depois de vistos, passam a “Lida” e saem do card na próxima visita — a lista completa fica em Notificações (Ver todas).',
  },
  {
    id: 'faq-league-vs-cup',
    question: 'Qual a diferença entre campeonato de liga e copa?',
    answer:
      'Em ligas (ex.: Brasileirão), a pontuação usa apenas as regras base em todas as rodadas. Em copas (ex.: Champions), a fase de grupos usa regras base e as fases eliminatórias aplicam multiplicadores sobre o total de pontos da partida.',
  },
  {
    id: 'faq-support',
    question: 'Encontrei um erro ou tenho outra dúvida. O que faço?',
    answer:
      'Entre em contato com o administrador do seu bolão ou com o suporte da plataforma (www.atmm.dev, link no rodapé).',
  },
];
