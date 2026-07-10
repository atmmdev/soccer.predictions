"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFixtureUpdateData = buildFixtureUpdateData;
const cup_phase_mapper_js_1 = require("../utils/cup-phase.mapper.js");
const fixture_status_mapper_js_1 = require("../utils/fixture-status.mapper.js");
function buildFixtureUpdateData(remote) {
    return {
        date: new Date(remote.utcDate),
        status: (0, fixture_status_mapper_js_1.mapFootballDataFixtureStatus)(remote.status),
        homeScore: remote.score.fullTime.home,
        awayScore: remote.score.fullTime.away,
        round: remote.matchday,
        phase: (0, cup_phase_mapper_js_1.mapStageToCupPhase)(remote.stage),
    };
}
//# sourceMappingURL=fixture-sync.mapper.js.map