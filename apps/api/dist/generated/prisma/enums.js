"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringAchievementType = exports.CupPhase = exports.PoolUserStatus = exports.PoolStatus = exports.FixtureStatus = exports.ChampionshipStatus = exports.ChampionshipType = exports.UserRole = exports.AuthProvider = void 0;
exports.AuthProvider = {
    LOCAL: 'LOCAL',
    GOOGLE: 'GOOGLE',
    INSTAGRAM: 'INSTAGRAM'
};
exports.UserRole = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    PARTICIPANT: 'PARTICIPANT'
};
exports.ChampionshipType = {
    LEAGUE: 'LEAGUE',
    CUP: 'CUP'
};
exports.ChampionshipStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
};
exports.FixtureStatus = {
    SCHEDULED: 'SCHEDULED',
    LIVE: 'LIVE',
    FINISHED: 'FINISHED',
    POSTPONED: 'POSTPONED',
    CANCELLED: 'CANCELLED'
};
exports.PoolStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    CLOSED: 'CLOSED'
};
exports.PoolUserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    PENDING: 'PENDING'
};
exports.CupPhase = {
    GROUP: 'GROUP',
    ROUND_OF_32: 'ROUND_OF_32',
    ROUND_OF_16: 'ROUND_OF_16',
    QUARTER_FINAL: 'QUARTER_FINAL',
    SEMI_FINAL: 'SEMI_FINAL',
    THIRD_PLACE: 'THIRD_PLACE',
    FINAL: 'FINAL'
};
exports.ScoringAchievementType = {
    EXACT_SCORE: 'EXACT_SCORE',
    WINNER_SCORE: 'WINNER_SCORE',
    LOSER_SCORE: 'LOSER_SCORE',
    CORRECT_WINNER: 'CORRECT_WINNER',
    DRAW_WITHOUT_EXACT_SCORE: 'DRAW_WITHOUT_EXACT_SCORE',
    PLAYER_GOAL: 'PLAYER_GOAL',
    PLAYER_HAT_TRICK: 'PLAYER_HAT_TRICK'
};
//# sourceMappingURL=enums.js.map