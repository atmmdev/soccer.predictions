/** Um palpite por usuário, pool e fixture. Apenas 1 jogador pode ser escolhido para marcar gol. */
export interface Prediction {
  id: number;
  poolId: number;
  userId: number;
  fixtureId: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  /** ID do único jogador escolhido para marcar gol; null se nenhum. */
  selectedPlayerId: number | null;
}
