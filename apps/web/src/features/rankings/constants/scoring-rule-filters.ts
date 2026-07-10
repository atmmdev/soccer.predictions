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
  { value: 'correctWinner', label: 'Vitória do Time vencedor sem placar exato' },
  { value: 'drawWithoutExactScore', label: 'Empate sem placar exato' },
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
