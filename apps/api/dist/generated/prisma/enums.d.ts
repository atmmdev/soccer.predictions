export declare const AuthProvider: {
    readonly LOCAL: "LOCAL";
    readonly GOOGLE: "GOOGLE";
    readonly INSTAGRAM: "INSTAGRAM";
};
export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider];
export declare const UserRole: {
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly ADMIN: "ADMIN";
    readonly PARTICIPANT: "PARTICIPANT";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const ChampionshipType: {
    readonly LEAGUE: "LEAGUE";
    readonly CUP: "CUP";
};
export type ChampionshipType = (typeof ChampionshipType)[keyof typeof ChampionshipType];
export declare const ChampionshipStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
};
export type ChampionshipStatus = (typeof ChampionshipStatus)[keyof typeof ChampionshipStatus];
export declare const FixtureStatus: {
    readonly SCHEDULED: "SCHEDULED";
    readonly LIVE: "LIVE";
    readonly FINISHED: "FINISHED";
    readonly POSTPONED: "POSTPONED";
    readonly CANCELLED: "CANCELLED";
};
export type FixtureStatus = (typeof FixtureStatus)[keyof typeof FixtureStatus];
export declare const PoolStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly CLOSED: "CLOSED";
};
export type PoolStatus = (typeof PoolStatus)[keyof typeof PoolStatus];
export declare const PoolUserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly PENDING: "PENDING";
};
export type PoolUserStatus = (typeof PoolUserStatus)[keyof typeof PoolUserStatus];
export declare const CupPhase: {
    readonly GROUP: "GROUP";
    readonly ROUND_OF_32: "ROUND_OF_32";
    readonly ROUND_OF_16: "ROUND_OF_16";
    readonly QUARTER_FINAL: "QUARTER_FINAL";
    readonly SEMI_FINAL: "SEMI_FINAL";
    readonly THIRD_PLACE: "THIRD_PLACE";
    readonly FINAL: "FINAL";
};
export type CupPhase = (typeof CupPhase)[keyof typeof CupPhase];
export declare const ScoringAchievementType: {
    readonly EXACT_SCORE: "EXACT_SCORE";
    readonly WINNER_SCORE: "WINNER_SCORE";
    readonly LOSER_SCORE: "LOSER_SCORE";
    readonly CORRECT_WINNER: "CORRECT_WINNER";
    readonly DRAW_WITHOUT_EXACT_SCORE: "DRAW_WITHOUT_EXACT_SCORE";
    readonly PLAYER_GOAL: "PLAYER_GOAL";
    readonly PLAYER_HAT_TRICK: "PLAYER_HAT_TRICK";
};
export type ScoringAchievementType = (typeof ScoringAchievementType)[keyof typeof ScoringAchievementType];
