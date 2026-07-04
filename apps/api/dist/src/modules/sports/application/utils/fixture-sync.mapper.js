"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFixtureUpdateData = buildFixtureUpdateData;
exports.isFinishedFixtureStatus = isFinishedFixtureStatus;
const cup_phase_mapper_js_1 = require("../utils/cup-phase.mapper.js");
const fixture_status_mapper_js_1 = require("../utils/fixture-status.mapper.js");
function buildFixtureUpdateData(remote, goalScorers) {
    const status = (0, fixture_status_mapper_js_1.mapApiFootballFixtureStatus)(remote.fixture.status.short);
    return {
        date: new Date(remote.fixture.date),
        status,
        homeScore: remote.goals.home,
        awayScore: remote.goals.away,
        round: (0, fixture_status_mapper_js_1.parseFixtureRound)(remote.league.round),
        phase: (0, cup_phase_mapper_js_1.mapRoundToCupPhase)(remote.league.round),
        ...(goalScorers
            ? { goalScorers: goalScorers }
            : {}),
    };
}
function isFinishedFixtureStatus(shortStatus) {
    return ['FT', 'AET', 'PEN'].includes(shortStatus);
}
//# sourceMappingURL=fixture-sync.mapper.js.map