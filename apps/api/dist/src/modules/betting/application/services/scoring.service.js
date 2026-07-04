"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoringService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const fixture_goal_scorers_js_1 = require("../../../sports/application/utils/fixture-goal-scorers.js");
const scoring_calculator_js_1 = require("../utils/scoring-calculator.js");
let ScoringService = class ScoringService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async syncPoolScores(poolId) {
        const pool = await this.prisma.pool.findUnique({
            where: { id: poolId },
            select: {
                id: true,
                scoring: true,
                championship: {
                    select: { id: true, type: true },
                },
            },
        });
        if (!pool) {
            return;
        }
        const fixtures = await this.prisma.fixture.findMany({
            where: {
                championshipId: pool.championship.id,
                status: 'FINISHED',
                homeScore: { not: null },
                awayScore: { not: null },
            },
            select: {
                id: true,
                homeScore: true,
                awayScore: true,
                phase: true,
                goalScorers: true,
            },
        });
        const scoring = (0, scoring_calculator_js_1.parsePoolScoringConfig)(pool.scoring);
        for (const fixture of fixtures) {
            await this.scoreFixture(poolId, fixture, pool.championship.type, scoring);
        }
    }
    async syncPoolsScores(poolIds) {
        for (const poolId of poolIds) {
            await this.syncPoolScores(poolId);
        }
    }
    async scoreFixture(poolId, fixture, championshipType, scoring) {
        const predictions = await this.prisma.prediction.findMany({
            where: { poolId, fixtureId: fixture.id },
        });
        if (predictions.length === 0) {
            return;
        }
        await this.prisma.pointHistory.deleteMany({
            where: { poolId, fixtureId: fixture.id },
        });
        const goalScorers = (0, fixture_goal_scorers_js_1.parseGoalScorers)(fixture.goalScorers);
        const rows = [];
        for (const prediction of predictions) {
            const result = (0, scoring_calculator_js_1.calculatePredictionScore)({
                predictedHome: prediction.predictedHomeScore,
                predictedAway: prediction.predictedAwayScore,
                actualHome: fixture.homeScore,
                actualAway: fixture.awayScore,
                selectedPlayerId: prediction.selectedPlayerId,
                playerGoalCount: (0, fixture_goal_scorers_js_1.getPlayerGoalCount)(goalScorers, prediction.selectedPlayerId),
                championshipType,
                fixturePhase: fixture.phase,
                scoring,
            });
            if (result.points === 0) {
                continue;
            }
            rows.push({
                poolId,
                userId: prediction.userId,
                fixtureId: fixture.id,
                points: result.points,
                achievementType: this.resolvePrimaryAchievement(result.achievements),
                breakdown: result.achievements,
            });
        }
        if (rows.length > 0) {
            await this.prisma.pointHistory.createMany({ data: rows });
        }
    }
    resolvePrimaryAchievement(achievements) {
        if (achievements.exactScore > 0) {
            return 'EXACT_SCORE';
        }
        if (achievements.winnerScore > 0) {
            return 'WINNER_SCORE';
        }
        if (achievements.loserScore > 0) {
            return 'LOSER_SCORE';
        }
        if (achievements.drawWithoutExactScore > 0) {
            return 'DRAW_WITHOUT_EXACT_SCORE';
        }
        if (achievements.correctWinner > 0) {
            return 'CORRECT_WINNER';
        }
        if (achievements.playerHatTrick > 0) {
            return 'PLAYER_HAT_TRICK';
        }
        if (achievements.playerGoal > 0) {
            return 'PLAYER_GOAL';
        }
        return null;
    }
    static aggregateBreakdown(entries) {
        let achievements = {
            exactScore: 0,
            winnerScore: 0,
            loserScore: 0,
            correctWinner: 0,
            drawWithoutExactScore: 0,
            playerGoal: 0,
            playerHatTrick: 0,
        };
        let points = 0;
        for (const entry of entries) {
            points += entry.points;
            if (!entry.breakdown || typeof entry.breakdown !== 'object') {
                continue;
            }
            achievements = (0, scoring_calculator_js_1.mergeAchievements)(achievements, entry.breakdown);
        }
        return { points, achievements };
    }
};
exports.ScoringService = ScoringService;
exports.ScoringService = ScoringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ScoringService);
//# sourceMappingURL=scoring.service.js.map