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
var SyncFixturesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncFixturesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const api_football_client_js_1 = require("../../infrastructure/integrations/api-football.client.js");
const fixture_goal_scorers_js_1 = require("../utils/fixture-goal-scorers.js");
const fixture_sync_mapper_js_1 = require("../utils/fixture-sync.mapper.js");
let SyncFixturesService = SyncFixturesService_1 = class SyncFixturesService {
    prisma;
    apiFootballClient;
    logger = new common_1.Logger(SyncFixturesService_1.name);
    constructor(prisma, apiFootballClient) {
        this.prisma = prisma;
        this.apiFootballClient = apiFootballClient;
    }
    async syncChampionship(championshipId) {
        const championship = await this.prisma.championship.findUnique({
            where: { id: championshipId },
            include: {
                league: true,
            },
        });
        if (!championship) {
            return 0;
        }
        const remoteFixtures = await this.apiFootballClient.getFixtures(championship.league.externalId, championship.season);
        let updated = 0;
        for (const remote of remoteFixtures) {
            const goalScorers = await this.resolveGoalScorers(remote);
            const result = await this.prisma.fixture.updateMany({
                where: { externalId: remote.fixture.id },
                data: (0, fixture_sync_mapper_js_1.buildFixtureUpdateData)(remote, goalScorers),
            });
            updated += result.count;
        }
        return updated;
    }
    async syncActiveChampionships(mode = 'all') {
        try {
            this.apiFootballClient.assertConfigured();
        }
        catch {
            this.logger.warn('API Football não configurada — sync ignorado');
            return;
        }
        const championships = await this.prisma.championship.findMany({
            where: { status: 'ACTIVE' },
            select: { id: true },
        });
        for (const championship of championships) {
            if (mode === 'live') {
                await this.syncLiveFixtures(championship.id);
                continue;
            }
            await this.syncChampionship(championship.id);
        }
    }
    async syncLiveFixtures(championshipId) {
        const liveFixtures = await this.prisma.fixture.findMany({
            where: {
                championshipId,
                status: { in: ['SCHEDULED', 'LIVE'] },
            },
            select: { externalId: true },
            take: 40,
        });
        if (liveFixtures.length === 0) {
            return;
        }
        const remoteFixtures = await this.apiFootballClient.getFixturesByIds(liveFixtures.map(fixture => fixture.externalId));
        for (const remote of remoteFixtures) {
            const goalScorers = await this.resolveGoalScorers(remote);
            await this.prisma.fixture.updateMany({
                where: { externalId: remote.fixture.id },
                data: (0, fixture_sync_mapper_js_1.buildFixtureUpdateData)(remote, goalScorers),
            });
        }
    }
    async resolveGoalScorers(remote) {
        if (!(0, fixture_sync_mapper_js_1.isFinishedFixtureStatus)(remote.fixture.status.short)) {
            return undefined;
        }
        try {
            const events = await this.apiFootballClient.getFixtureEvents(remote.fixture.id);
            return (0, fixture_goal_scorers_js_1.mapEventsToGoalScorers)(events);
        }
        catch (error) {
            this.logger.warn(`Não foi possível carregar gols do fixture ${remote.fixture.id}`, error);
            return undefined;
        }
    }
};
exports.SyncFixturesService = SyncFixturesService;
exports.SyncFixturesService = SyncFixturesService = SyncFixturesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        api_football_client_js_1.ApiFootballClient])
], SyncFixturesService);
//# sourceMappingURL=sync-fixtures.service.js.map