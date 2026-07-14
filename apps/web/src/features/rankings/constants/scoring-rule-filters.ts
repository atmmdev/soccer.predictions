import type {
  RankingScoringRuleFilter,
} from '../types/ranking-entry';

export const SCORING_RULE_FILTER_OPTIONS: Array<{
  value: RankingScoringRuleFilter;
  label: string;
}> = [
  { value: 'ALL', label: 'Filtro por Regra de Pontuação' },
  { value: 'exactScore', label: 'Placar exato' },
  { value: 'winnerScore', label: 'Placar do vencedor' },
  { value: 'loserScore', label: 'Placar do perdedor' },
  { value: 'correctWinner', label: 'Vitória do Time vencedor sem placar exato' },
  { value: 'drawWithoutExactScore', label: 'Empate sem placar exato' },
];
