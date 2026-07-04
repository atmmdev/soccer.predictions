"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapApiFootballFixtureStatus = mapApiFootballFixtureStatus;
exports.parseFixtureRound = parseFixtureRound;
const LIVE_STATUSES = new Set([
    '1H',
    'HT',
    '2H',
    'ET',
    'BT',
    'P',
    'LIVE',
    'INT',
]);
const FINISHED_STATUSES = new Set(['FT', 'AET', 'PEN']);
const POSTPONED_STATUSES = new Set(['PST', 'SUSP']);
const CANCELLED_STATUSES = new Set(['CANC', 'ABD', 'AWD', 'WO']);
function mapApiFootballFixtureStatus(short) {
    if (LIVE_STATUSES.has(short)) {
        return 'LIVE';
    }
    if (FINISHED_STATUSES.has(short)) {
        return 'FINISHED';
    }
    if (POSTPONED_STATUSES.has(short)) {
        return 'POSTPONED';
    }
    if (CANCELLED_STATUSES.has(short)) {
        return 'CANCELLED';
    }
    return 'SCHEDULED';
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