import type { ScoringAchievementKey } from '../types/ranking-entry';

export type RankingStatKey = 'predictionsCount' | ScoringAchievementKey;

export interface RankingColumnDefinition {
  key: RankingStatKey;
  sigla: string;
  label: string;
}

export const RANKING_STAT_COLUMNS: RankingColumnDefinition[] = [
  { key: 'predictionsCount', sigla: 'PJ', label: 'Palpites jogados' },
  { key: 'exactScore', sigla: 'PE', label: 'Placar exato' },
  { key: 'winnerScore', sigla: 'PV', label: 'Gols do time vencedor' },
  { key: 'loserScore', sigla: 'PP', label: 'Gols do time perdedor' },
  { key: 'correctWinner', sigla: 'VV', label: 'Vitória vencedor' },
  {
    key: 'drawWithoutExactScore',
    sigla: 'EE',
    label: 'Empate sem placar exato',
  },
];

export const RANKING_LEGEND_ITEMS: Array<{ sigla: string; label: string }> = [
  ...RANKING_STAT_COLUMNS,
  { sigla: 'Pts', label: 'Pontos totais' },
];
