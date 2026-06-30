import type {
  RankingScoringRuleFilter,
  ScoringAchievementKey,
} from '../types/ranking-entry';

export const SCORING_RULE_FILTER_OPTIONS: Array<{
  value: RankingScoringRuleFilter;
  label: string;
}> = [
  { value: 'ALL', label: 'Filtro por Regra de Pontuação' },
  { value: 'exactScore', label: 'Placar exato' },
  { value: 'winnerScore', label: 'Placar do vencedor' },
  { value: 'loserScore', label: 'Placar do perdedor' },
  { value: 'correctWinner', label: 'Vencedor sem placar exato' },
  { value: 'correctDraw', label: 'Empate sem placar exato' },
  { value: 'playerGoal', label: 'Jogador marcou gol' },
  { value: 'playerHatTrick', label: 'Hat-trick do jogador' },
];

export const SCORING_ACHIEVEMENT_LABELS: Record<ScoringAchievementKey, string> =
  Object.fromEntries(
    SCORING_RULE_FILTER_OPTIONS.filter(
      (option): option is { value: ScoringAchievementKey; label: string } =>
        option.value !== 'ALL',
    ).map(option => [option.value, option.label]),
  ) as Record<ScoringAchievementKey, string>;

export const SCORING_ACHIEVEMENT_COLUMNS = SCORING_RULE_FILTER_OPTIONS.filter(
  (option): option is { value: ScoringAchievementKey; label: string } =>
    option.value !== 'ALL',
).map(option => ({
  key: option.value,
  label: option.label,
}));
