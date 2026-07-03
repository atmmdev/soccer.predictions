export interface BaseScoringRules {
  exactScore: number;
  winnerScore: number;
  loserScore: number;
  correctWinner: number;
  drawWithoutExactScore: number;
  playerGoal: number;
  playerHatTrickMultiplier: number;
}

export interface PoolScoringConfig {
  base: BaseScoringRules;
  cupPhases: unknown[] | null;
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
