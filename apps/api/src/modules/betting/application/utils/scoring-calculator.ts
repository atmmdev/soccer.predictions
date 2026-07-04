import type { ChampionshipType, CupPhase } from '../../../../../generated/prisma/client.js';

export interface BaseScoringRules {
  exactScore: number;
  winnerScore: number;
  loserScore: number;
  correctWinner: number;
  drawWithoutExactScore: number;
  playerGoal: number;
  playerHatTrickMultiplier: number;
}

export interface CupPhaseRule {
  phase: CupPhase;
  label: string;
  multiplier: number;
}

export interface PoolScoringConfig {
  base: BaseScoringRules;
  cupPhases: CupPhaseRule[] | null;
}

export interface ScoringAchievementCounts {
  exactScore: number;
  winnerScore: number;
  loserScore: number;
  correctWinner: number;
  drawWithoutExactScore: number;
  playerGoal: number;
  playerHatTrick: number;
}

export interface MatchScoreResult {
  points: number;
  achievements: ScoringAchievementCounts;
}

export interface PredictionScoreInput {
  predictedHome: number;
  predictedAway: number;
  actualHome: number;
  actualAway: number;
  selectedPlayerId: number | null;
  playerGoalCount: number;
  championshipType: ChampionshipType;
  fixturePhase: CupPhase | null;
  scoring: PoolScoringConfig;
}

type MatchOutcome = 'HOME' | 'AWAY' | 'DRAW';

function emptyAchievements(): ScoringAchievementCounts {
  return {
    exactScore: 0,
    winnerScore: 0,
    loserScore: 0,
    correctWinner: 0,
    drawWithoutExactScore: 0,
    playerGoal: 0,
    playerHatTrick: 0,
  };
}

function getOutcome(home: number, away: number): MatchOutcome {
  if (home > away) {
    return 'HOME';
  }

  if (away > home) {
    return 'AWAY';
  }

  return 'DRAW';
}

export function calculateMatchScore(
  predictedHome: number,
  predictedAway: number,
  actualHome: number,
  actualAway: number,
  base: BaseScoringRules,
): MatchScoreResult {
  const achievements = emptyAchievements();

  if (predictedHome === actualHome && predictedAway === actualAway) {
    achievements.exactScore = 1;

    return {
      points: base.exactScore,
      achievements,
    };
  }

  let points = 0;
  const actualOutcome = getOutcome(actualHome, actualAway);
  const predictedOutcome = getOutcome(predictedHome, predictedAway);

  if (actualOutcome !== predictedOutcome) {
    return { points: 0, achievements };
  }

  if (actualOutcome === 'DRAW') {
    achievements.drawWithoutExactScore = 1;
    points += base.drawWithoutExactScore;

    return { points, achievements };
  }

  const homeGoalsMatch = predictedHome === actualHome;
  const awayGoalsMatch = predictedAway === actualAway;

  if (actualOutcome === 'HOME') {
    if (homeGoalsMatch) {
      achievements.winnerScore = 1;
      points += base.winnerScore;
    }

    if (awayGoalsMatch) {
      achievements.loserScore = 1;
      points += base.loserScore;
    }

    if (!homeGoalsMatch && !awayGoalsMatch) {
      achievements.correctWinner = 1;
      points += base.correctWinner;
    }
  } else {
    if (awayGoalsMatch) {
      achievements.winnerScore = 1;
      points += base.winnerScore;
    }

    if (homeGoalsMatch) {
      achievements.loserScore = 1;
      points += base.loserScore;
    }

    if (!awayGoalsMatch && !homeGoalsMatch) {
      achievements.correctWinner = 1;
      points += base.correctWinner;
    }
  }

  return { points, achievements };
}

export function calculatePlayerGoalBonus(
  selectedPlayerId: number | null,
  playerGoalCount: number,
  base: BaseScoringRules,
): Pick<ScoringAchievementCounts, 'playerGoal' | 'playerHatTrick'> & {
  points: number;
} {
  if (selectedPlayerId === null || playerGoalCount <= 0) {
    return {
      points: 0,
      playerGoal: 0,
      playerHatTrick: 0,
    };
  }

  if (playerGoalCount >= 3) {
    return {
      points: base.playerGoal * base.playerHatTrickMultiplier,
      playerGoal: 0,
      playerHatTrick: 1,
    };
  }

  return {
    points: base.playerGoal,
    playerGoal: 1,
    playerHatTrick: 0,
  };
}

export function getCupPhaseMultiplier(
  championshipType: ChampionshipType,
  fixturePhase: CupPhase | null,
  cupPhases: CupPhaseRule[] | null,
): number {
  if (championshipType !== 'CUP' || !cupPhases?.length) {
    return 1;
  }

  const phase = fixturePhase ?? 'GROUP';
  const rule = cupPhases.find(entry => entry.phase === phase);

  return rule?.multiplier ?? 1;
}

export function calculatePredictionScore(
  input: PredictionScoreInput,
): MatchScoreResult {
  const matchResult = calculateMatchScore(
    input.predictedHome,
    input.predictedAway,
    input.actualHome,
    input.actualAway,
    input.scoring.base,
  );

  const playerResult = calculatePlayerGoalBonus(
    input.selectedPlayerId,
    input.playerGoalCount,
    input.scoring.base,
  );

  const subtotal = matchResult.points + playerResult.points;
  const multiplier = getCupPhaseMultiplier(
    input.championshipType,
    input.fixturePhase,
    input.scoring.cupPhases,
  );
  const totalPoints = subtotal * multiplier;

  return {
    points: totalPoints,
    achievements: {
      ...matchResult.achievements,
      playerGoal: playerResult.playerGoal,
      playerHatTrick: playerResult.playerHatTrick,
    },
  };
}

export function mergeAchievements(
  left: ScoringAchievementCounts,
  right: ScoringAchievementCounts,
): ScoringAchievementCounts {
  return {
    exactScore: left.exactScore + right.exactScore,
    winnerScore: left.winnerScore + right.winnerScore,
    loserScore: left.loserScore + right.loserScore,
    correctWinner: left.correctWinner + right.correctWinner,
    drawWithoutExactScore:
      left.drawWithoutExactScore + right.drawWithoutExactScore,
    playerGoal: left.playerGoal + right.playerGoal,
    playerHatTrick: left.playerHatTrick + right.playerHatTrick,
  };
}

export function parsePoolScoringConfig(value: unknown): PoolScoringConfig {
  const config = value as PoolScoringConfig;

  return {
    base: config.base,
    cupPhases: config.cupPhases ?? null,
  };
}
