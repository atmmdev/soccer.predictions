"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationOrderByRelevanceFieldEnum = exports.PoolOrderByRelevanceFieldEnum = exports.QueryMode = exports.JsonNullValueFilter = exports.TeamOrderByRelevanceFieldEnum = exports.ChampionshipOrderByRelevanceFieldEnum = exports.LeagueOrderByRelevanceFieldEnum = exports.EmailDispatchLogOrderByRelevanceFieldEnum = exports.EmailVerificationTokenOrderByRelevanceFieldEnum = exports.PasswordResetTokenOrderByRelevanceFieldEnum = exports.UserOrderByRelevanceFieldEnum = exports.NullsOrder = exports.JsonNullValueInput = exports.NullableJsonNullValueInput = exports.SortOrder = exports.PointHistoryScalarFieldEnum = exports.PredictionScalarFieldEnum = exports.InvitationScalarFieldEnum = exports.PoolUserScalarFieldEnum = exports.PoolScalarFieldEnum = exports.FixtureScalarFieldEnum = exports.TeamScalarFieldEnum = exports.ChampionshipScalarFieldEnum = exports.LeagueScalarFieldEnum = exports.EmailDispatchLogScalarFieldEnum = exports.EmailVerificationTokenScalarFieldEnum = exports.PasswordResetTokenScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    PasswordResetToken: 'PasswordResetToken',
    EmailVerificationToken: 'EmailVerificationToken',
    EmailDispatchLog: 'EmailDispatchLog',
    League: 'League',
    Championship: 'Championship',
    Team: 'Team',
    Fixture: 'Fixture',
    Pool: 'Pool',
    PoolUser: 'PoolUser',
    Invitation: 'Invitation',
    Prediction: 'Prediction',
    PointHistory: 'PointHistory'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    phone: 'phone',
    avatarDataUrl: 'avatarDataUrl',
    password: 'password',
    authProvider: 'authProvider',
    providerId: 'providerId',
    role: 'role',
    emailVerifiedAt: 'emailVerifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
exports.EmailVerificationTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
exports.EmailDispatchLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    dayKey: 'dayKey',
    createdAt: 'createdAt'
};
exports.LeagueScalarFieldEnum = {
    id: 'id',
    externalId: 'externalId',
    name: 'name',
    country: 'country',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ChampionshipScalarFieldEnum = {
    id: 'id',
    leagueId: 'leagueId',
    season: 'season',
    name: 'name',
    country: 'country',
    flags: 'flags',
    type: 'type',
    status: 'status',
    isCurrentSeason: 'isCurrentSeason',
    allowNewPools: 'allowNewPools',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TeamScalarFieldEnum = {
    id: 'id',
    externalId: 'externalId',
    name: 'name',
    logo: 'logo',
    country: 'country',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FixtureScalarFieldEnum = {
    id: 'id',
    externalId: 'externalId',
    championshipId: 'championshipId',
    homeTeamId: 'homeTeamId',
    awayTeamId: 'awayTeamId',
    date: 'date',
    status: 'status',
    homeScore: 'homeScore',
    awayScore: 'awayScore',
    round: 'round',
    phase: 'phase',
    goalScorers: 'goalScorers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PoolScalarFieldEnum = {
    id: 'id',
    ownerId: 'ownerId',
    championshipId: 'championshipId',
    name: 'name',
    inviteCode: 'inviteCode',
    status: 'status',
    scoring: 'scoring',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PoolUserScalarFieldEnum = {
    id: 'id',
    poolId: 'poolId',
    userId: 'userId',
    status: 'status',
    joinedAt: 'joinedAt'
};
exports.InvitationScalarFieldEnum = {
    id: 'id',
    poolId: 'poolId',
    code: 'code',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
};
exports.PredictionScalarFieldEnum = {
    id: 'id',
    poolId: 'poolId',
    userId: 'userId',
    fixtureId: 'fixtureId',
    predictedHomeScore: 'predictedHomeScore',
    predictedAwayScore: 'predictedAwayScore',
    selectedPlayerId: 'selectedPlayerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PointHistoryScalarFieldEnum = {
    id: 'id',
    poolId: 'poolId',
    userId: 'userId',
    fixtureId: 'fixtureId',
    points: 'points',
    achievementType: 'achievementType',
    breakdown: 'breakdown',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.UserOrderByRelevanceFieldEnum = {
    email: 'email',
    name: 'name',
    phone: 'phone',
    avatarDataUrl: 'avatarDataUrl',
    password: 'password',
    providerId: 'providerId'
};
exports.PasswordResetTokenOrderByRelevanceFieldEnum = {
    tokenHash: 'tokenHash'
};
exports.EmailVerificationTokenOrderByRelevanceFieldEnum = {
    tokenHash: 'tokenHash'
};
exports.EmailDispatchLogOrderByRelevanceFieldEnum = {
    dayKey: 'dayKey'
};
exports.LeagueOrderByRelevanceFieldEnum = {
    name: 'name',
    country: 'country',
    type: 'type'
};
exports.ChampionshipOrderByRelevanceFieldEnum = {
    name: 'name',
    country: 'country',
    flags: 'flags'
};
exports.TeamOrderByRelevanceFieldEnum = {
    name: 'name',
    logo: 'logo',
    country: 'country'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.PoolOrderByRelevanceFieldEnum = {
    name: 'name',
    inviteCode: 'inviteCode'
};
exports.InvitationOrderByRelevanceFieldEnum = {
    code: 'code'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map