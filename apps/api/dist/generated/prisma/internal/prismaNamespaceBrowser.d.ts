import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly PasswordResetToken: "PasswordResetToken";
    readonly League: "League";
    readonly Championship: "Championship";
    readonly Team: "Team";
    readonly Fixture: "Fixture";
    readonly Pool: "Pool";
    readonly PoolUser: "PoolUser";
    readonly Invitation: "Invitation";
    readonly Prediction: "Prediction";
    readonly PointHistory: "PointHistory";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly name: "name";
    readonly password: "password";
    readonly authProvider: "authProvider";
    readonly providerId: "providerId";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const LeagueScalarFieldEnum: {
    readonly id: "id";
    readonly externalId: "externalId";
    readonly name: "name";
    readonly country: "country";
    readonly type: "type";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LeagueScalarFieldEnum = (typeof LeagueScalarFieldEnum)[keyof typeof LeagueScalarFieldEnum];
export declare const ChampionshipScalarFieldEnum: {
    readonly id: "id";
    readonly leagueId: "leagueId";
    readonly season: "season";
    readonly name: "name";
    readonly country: "country";
    readonly flags: "flags";
    readonly type: "type";
    readonly status: "status";
    readonly isCurrentSeason: "isCurrentSeason";
    readonly allowNewPools: "allowNewPools";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChampionshipScalarFieldEnum = (typeof ChampionshipScalarFieldEnum)[keyof typeof ChampionshipScalarFieldEnum];
export declare const TeamScalarFieldEnum: {
    readonly id: "id";
    readonly externalId: "externalId";
    readonly name: "name";
    readonly logo: "logo";
    readonly country: "country";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum];
export declare const FixtureScalarFieldEnum: {
    readonly id: "id";
    readonly externalId: "externalId";
    readonly championshipId: "championshipId";
    readonly homeTeamId: "homeTeamId";
    readonly awayTeamId: "awayTeamId";
    readonly date: "date";
    readonly status: "status";
    readonly homeScore: "homeScore";
    readonly awayScore: "awayScore";
    readonly round: "round";
    readonly phase: "phase";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FixtureScalarFieldEnum = (typeof FixtureScalarFieldEnum)[keyof typeof FixtureScalarFieldEnum];
export declare const PoolScalarFieldEnum: {
    readonly id: "id";
    readonly ownerId: "ownerId";
    readonly championshipId: "championshipId";
    readonly name: "name";
    readonly inviteCode: "inviteCode";
    readonly status: "status";
    readonly scoring: "scoring";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PoolScalarFieldEnum = (typeof PoolScalarFieldEnum)[keyof typeof PoolScalarFieldEnum];
export declare const PoolUserScalarFieldEnum: {
    readonly id: "id";
    readonly poolId: "poolId";
    readonly userId: "userId";
    readonly status: "status";
    readonly joinedAt: "joinedAt";
};
export type PoolUserScalarFieldEnum = (typeof PoolUserScalarFieldEnum)[keyof typeof PoolUserScalarFieldEnum];
export declare const InvitationScalarFieldEnum: {
    readonly id: "id";
    readonly poolId: "poolId";
    readonly code: "code";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type InvitationScalarFieldEnum = (typeof InvitationScalarFieldEnum)[keyof typeof InvitationScalarFieldEnum];
export declare const PredictionScalarFieldEnum: {
    readonly id: "id";
    readonly poolId: "poolId";
    readonly userId: "userId";
    readonly fixtureId: "fixtureId";
    readonly predictedHomeScore: "predictedHomeScore";
    readonly predictedAwayScore: "predictedAwayScore";
    readonly selectedPlayerId: "selectedPlayerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PredictionScalarFieldEnum = (typeof PredictionScalarFieldEnum)[keyof typeof PredictionScalarFieldEnum];
export declare const PointHistoryScalarFieldEnum: {
    readonly id: "id";
    readonly poolId: "poolId";
    readonly userId: "userId";
    readonly fixtureId: "fixtureId";
    readonly points: "points";
    readonly achievementType: "achievementType";
    readonly breakdown: "breakdown";
    readonly createdAt: "createdAt";
};
export type PointHistoryScalarFieldEnum = (typeof PointHistoryScalarFieldEnum)[keyof typeof PointHistoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const UserOrderByRelevanceFieldEnum: {
    readonly email: "email";
    readonly name: "name";
    readonly password: "password";
    readonly providerId: "providerId";
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const PasswordResetTokenOrderByRelevanceFieldEnum: {
    readonly tokenHash: "tokenHash";
};
export type PasswordResetTokenOrderByRelevanceFieldEnum = (typeof PasswordResetTokenOrderByRelevanceFieldEnum)[keyof typeof PasswordResetTokenOrderByRelevanceFieldEnum];
export declare const LeagueOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly country: "country";
    readonly type: "type";
};
export type LeagueOrderByRelevanceFieldEnum = (typeof LeagueOrderByRelevanceFieldEnum)[keyof typeof LeagueOrderByRelevanceFieldEnum];
export declare const ChampionshipOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly country: "country";
    readonly flags: "flags";
};
export type ChampionshipOrderByRelevanceFieldEnum = (typeof ChampionshipOrderByRelevanceFieldEnum)[keyof typeof ChampionshipOrderByRelevanceFieldEnum];
export declare const TeamOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly logo: "logo";
    readonly country: "country";
};
export type TeamOrderByRelevanceFieldEnum = (typeof TeamOrderByRelevanceFieldEnum)[keyof typeof TeamOrderByRelevanceFieldEnum];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const PoolOrderByRelevanceFieldEnum: {
    readonly name: "name";
    readonly inviteCode: "inviteCode";
};
export type PoolOrderByRelevanceFieldEnum = (typeof PoolOrderByRelevanceFieldEnum)[keyof typeof PoolOrderByRelevanceFieldEnum];
export declare const InvitationOrderByRelevanceFieldEnum: {
    readonly code: "code";
};
export type InvitationOrderByRelevanceFieldEnum = (typeof InvitationOrderByRelevanceFieldEnum)[keyof typeof InvitationOrderByRelevanceFieldEnum];
