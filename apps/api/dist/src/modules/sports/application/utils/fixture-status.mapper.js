"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFootballDataFixtureStatus = mapFootballDataFixtureStatus;
exports.isFinishedFootballDataStatus = isFinishedFootballDataStatus;
exports.parseFixtureRound = parseFixtureRound;
function mapFootballDataFixtureStatus(status) {
    switch (status) {
        case 'IN_PLAY':
        case 'PAUSED':
            return 'LIVE';
        case 'FINISHED':
        case 'AWARDED':
            return 'FINISHED';
        case 'POSTPONED':
        case 'SUSPENDED':
            return 'POSTPONED';
        case 'CANCELLED':
            return 'CANCELLED';
        case 'SCHEDULED':
        case 'TIMED':
        default:
            return 'SCHEDULED';
    }
}
function isFinishedFootballDataStatus(status) {
    return status === 'FINISHED' || status === 'AWARDED';
}
function parseFixtureRound(round) {
    if (!round) {
        return null;
    }
    const match = round.match(/(\d+)\s*$/);
    if (!match) {
        return null;
    }
    return Number.parseInt(match[1], 10);
}
//# sourceMappingURL=fixture-status.mapper.js.map