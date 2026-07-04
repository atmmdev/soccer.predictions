import {
  defaultBaseScoringRules,
  defaultCupPhaseRules,
} from '@/features/pools/mocks/scoring-templates';

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
    'O Soccer Predictions é uma plataforma de bolões de futebol. Administradores importam campeonatos reais; participantes entram em bolões, registram palpites nos jogos e competem no ranking com base nos pontos acumulados.',
    'Cada bolão pode ter regras de pontuação personalizadas definidas pelo administrador na criação. Os valores abaixo são os padrões do sistema — o administrador do bolão pode alterá-los.',
    'A pontuação é calculada automaticamente quando o jogo é finalizado. O ranking é sempre derivado do histórico de pontos — não existe tabela de ranking separada.',
  ],
};

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Crie sua conta',
    description:
      'Cadastre-se com e-mail e senha ou entre com Google/Instagram. Sua sessão fica salva no navegador.',
  },
  {
    step: 2,
    title: 'Entre em um bolão',
    description:
      'Participe de um bolão existente usando o código de convite ou crie o seu (se for administrador), vinculado a um campeonato.',
  },
  {
    step: 3,
    title: 'Registre seus palpites',
    description:
      'Em Meus Palpites ou Jogos, informe o placar de cada partida e, opcionalmente, escolha um jogador para marcar gol.',
  },
  {
    step: 4,
    title: 'Acompanhe os resultados',
    description:
      'Quando o jogo termina, seus pontos são calculados e aparecem em Jogos, Meus Palpites e no Ranking do bolão.',
  },
  {
    step: 5,
    title: 'Dispute o ranking',
    description:
      'Compare seu desempenho com os demais participantes. Quem acumular mais pontos ao longo do campeonato lidera a classificação.',
  },
];

export const PREDICTION_RULES = [
  {
    title: 'Prazo para palpitar',
    description:
      'Você pode enviar ou editar um palpite até 10 minutos antes do horário de início da partida. Após esse prazo, o palpite fica bloqueado.',
  },
  {
    title: 'Placar obrigatório',
    description:
      'Informe quantos gols cada time marcará. O palpite considera mandante × visitante (ex.: 2 × 1).',
  },
  {
    title: 'Jogador artilheiro',
    description:
      'Você pode escolher no máximo 1 jogador por partida para marcar gol. Se ele marcar, você ganha bônus extra. Hat-trick (3+ gols) dobra o bônus.',
  },
  {
    title: 'Sem palpite, sem pontos',
    description:
      'Se você não registrar seu palpite antes do prazo, não pontua naquela partida.',
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
    label: 'Vitória vencedor',
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
  {
    key: 'playerGoal',
    label: 'Jogador marcou gol',
    points: defaultBaseScoringRules.playerGoal,
    description:
      'O jogador escolhido marcou pelo menos 1 gol na partida (bônus cumulativo).',
  },
  {
    key: 'playerHatTrick',
    label: 'Hat-trick do jogador',
    points: `×${defaultBaseScoringRules.playerHatTrickMultiplier}`,
    description:
      'Multiplicador aplicado sobre o bônus de jogador quando ele faz 3 ou mais gols.',
  },
];

export const SCORING_EVALUATION_ORDER = [
  'Placar exato — se acertou, não soma regras parciais de vencedor ou empate.',
  'Gols do vencedor e do perdedor — quando não é placar exato, mas os gols de cada lado batem.',
  'Vencedor ou empate — quando acertou o resultado, mas errou os gols.',
  'Bônus de jogador — independente do placar, se o jogador escolhido marcou.',
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
    note: 'Errou vencedor e gols. Só pontua se houver bônus de jogador.',
  },
  {
    id: 'player-goal',
    title: 'Bônus de jogador',
    result: 'Brasil 1 × 1 Argentina',
    prediction: '2 × 2 + Vinícius Jr. marcou',
    breakdown: [
      'Empate sem placar exato: 3 pts',
      'Jogador marcou gol: 10 pts',
    ],
    total: 13,
    note: 'Regras de placar e bônus de jogador são cumulativas.',
  },
  {
    id: 'player-hattrick',
    title: 'Hat-trick do jogador',
    result: 'França 3 × 0 Alemanha',
    prediction: '3 × 0 + Mbappé marcou (3 gols)',
    breakdown: [
      'Placar exato: 10 pts',
      'Jogador marcou gol: 10 pts × 2 (hat-trick): 20 pts',
    ],
    total: 30,
    note: 'Hat-trick dobra o bônus de jogador (multiplicador padrão: ×2).',
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
    answer:
      'Até 10 minutos antes do horário oficial de início da partida. Depois disso, o sistema bloqueia criação e edição. Confira o horário em Jogos ou Meus Palpites.',
  },
  {
    id: 'faq-no-prediction',
    question: 'Esqueci de palpitar. Posso pontuar mesmo assim?',
    answer:
      'Não. Sem palpite registrado antes do prazo, você recebe 0 pontos naquela partida, independentemente do resultado real.',
  },
  {
    id: 'faq-multiple-pools',
    question: 'Posso participar de mais de um bolão?',
    answer:
      'Sim. Cada bolão tem ranking e regras independentes. Você palpita separadamente em cada um, mesmo quando os jogos são os mesmos.',
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
    id: 'faq-player-change',
    question: 'Posso trocar o jogador escolhido depois de selecionar?',
    answer:
      'Sim, enquanto estiver dentro do prazo. Use Trocar para escolher outro jogador ou Remover para limpar a seleção.',
  },
  {
    id: 'faq-ranking',
    question: 'Como o ranking é calculado?',
    answer:
      'O ranking soma todos os pontos que você ganhou em cada partida do bolão. Quem tiver mais pontos totais fica na frente. Em empate, a posição pode ser desempatada por critérios do bolão (ex.: mais placares exatos).',
  },
  {
    id: 'faq-live',
    question: 'Os pontos aparecem durante o jogo ao vivo?',
    answer:
      'Não. A pontuação é calculada quando a partida é finalizada (status "Encerrado"). Durante o jogo, você vê seu palpite, mas os pontos só aparecem após o apito final.',
  },
  {
    id: 'faq-invite',
    question: 'Como entro em um bolão?',
    answer:
      'Peça o código de convite ao administrador do bolão. Em Bolões, use a opção de entrar com código para participar.',
  },
  {
    id: 'faq-admin-scoring',
    question: 'Sou administrador. Posso mudar as regras depois de criar o bolão?',
    answer:
      'No MVP atual, as regras são definidas na criação do bolão. Alterações posteriores estão previstas para versões futuras. Comunique os participantes se houver mudanças manuais.',
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
      'Entre em contato com o administrador do seu bolão ou com o suporte da plataforma pelo e-mail de contato informado no rodapé da aplicação.',
  },
];
