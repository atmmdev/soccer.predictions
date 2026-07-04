"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMatchScore = calculateMatchScore;
exports.calculatePlayerGoalBonus = calculatePlayerGoalBonus;
exports.getCupPhaseMultiplier = getCupPhaseMultiplier;
exports.calculatePredictionScore = calculatePredictionScore;
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
function calculatePlayerGoalBonus(selectedPlayerId, playerGoalCount, base) {
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
function getCupPhaseMultiplier(championshipType, fixturePhase, cupPhases) {
    if (championshipType !== 'CUP' || !cupPhases?.length) {
        return 1;
    }
    const phase = fixturePhase ?? 'GROUP';
    const rule = cupPhases.find(entry => entry.phase === phase);
    return rule?.multiplier ?? 1;
}
function calculatePredictionScore(input) {
    const matchResult = calculateMatchScore(input.predictedHome, input.predictedAway, input.actualHome, input.actualAway, input.scoring.base);
    const playerResult = calculatePlayerGoalBonus(input.selectedPlayerId, input.playerGoalCount, input.scoring.base);
    const subtotal = matchResult.points + playerResult.points;
    const multiplier = getCupPhaseMultiplier(input.championshipType, input.fixturePhase, input.scoring.cupPhases);
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