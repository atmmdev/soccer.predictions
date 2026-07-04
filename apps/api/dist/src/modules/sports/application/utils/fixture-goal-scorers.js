"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEventsToGoalScorers = mapEventsToGoalScorers;
exports.parseGoalScorers = parseGoalScorers;
exports.getPlayerGoalCount = getPlayerGoalCount;
function mapEventsToGoalScorers(events) {
    const counts = new Map();
    for (const event of events) {
        if (event.type !== 'Goal' || !event.player?.id) {
            continue;
        }
        counts.set(event.player.id, (counts.get(event.player.id) ?? 0) + 1);
    }
    return [...counts.entries()].map(([playerId, goals]) => ({
        playerId,
        goals,
    }));
}
function parseGoalScorers(value) {
    if (!Array.isArray(value)) {
        return [];
    }
    return value.flatMap(entry => {
        if (!entry || typeof entry !== 'object') {
            return [];
        }
        const record = entry;
        if (typeof record.playerId !== 'number' ||
            typeof record.goals !== 'number') {
            return [];
        }
        return [{ playerId: record.playerId, goals: record.goals }];
    });
}
function getPlayerGoalCount(goalScorers, playerId) {
    if (playerId === null) {
        return 0;
    }
    return goalScorers.find(scorer => scorer.playerId === playerId)?.goals ?? 0;
}
//# sourceMappingURL=fixture-goal-scorers.js.map