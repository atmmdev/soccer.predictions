"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMatchScore = calculateMatchScore;
exports.mergeAchievements = mergeAchievements;
exports.parsePoolScoringConfig = parsePoolScoringConfig;
function emptyAchievements() {
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
function getOutcome(home, away) {
    if (home > away) {
        return 'HOME';
    }
    if (away > home) {
        return 'AWAY';
    }
    return 'DRAW';
}
function calculateMatchScore(predictedHome, predictedAway, actualHome, actualAway, base) {
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
    }
    else {
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
function mergeAchievements(left, right) {
    return {
        exactScore: left.exactScore + right.exactScore,
        winnerScore: left.winnerScore + right.winnerScore,
        loserScore: left.loserScore + right.loserScore,
        correctWinner: left.correctWinner + right.correctWinner,
        drawWithoutExactScore: left.drawWithoutExactScore + right.drawWithoutExactScore,
        playerGoal: left.playerGoal + right.playerGoal,
        playerHatTrick: left.playerHatTrick + right.playerHatTrick,
    };
}
function parsePoolScoringConfig(value) {
    const config = value;
    return {
        base: config.base,
        cupPhases: config.cupPhases ?? null,
    };
}
//# sourceMappingURL=scoring-calculator.js.map