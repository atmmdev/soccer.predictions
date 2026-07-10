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
const scoring_service_js_1 = require("../../../betting/application/services/scoring.service.js");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const football_data_client_js_1 = require("../../infrastructure/integrations/football-data.client.js");
const fixture_sync_mapper_js_1 = require("../utils/fixture-sync.mapper.js");
let SyncFixturesService = SyncFixturesService_1 = class SyncFixturesService {
    prisma;
    footballDataClient;
    scoringService;
    logger = new common_1.Logger(SyncFixturesService_1.name);
    constructor(prisma, footballDataClient, scoringService) {
        this.prisma = prisma;
        this.footballDataClient = footballDataClient;
        this.scoringService = scoringService;
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
        const remoteMatches = await this.footballDataClient.getCompetitionMatches(championship.league.externalId, championship.season);
        let updated = 0;
        for (const remote of remoteMatches) {
            const result = await this.prisma.fixture.updateMany({
                where: { externalId: remote.id },
                data: (0, fixture_sync_mapper_js_1.buildFixtureUpdateData)(remote),
            });
            updated += result.count;
        }
        await this.scoringService.syncScoresForChampionship(championshipId);
        return updated;
    }
    async syncActiveChampionships(mode = 'all') {
        try {
            this.footballDataClient.assertConfigured();
        }
        catch {
            this.logger.warn('Football Data não configurada — sync ignorado');
            return;
        }
        const championships = await this.prisma.championship.findMany({
            where: { status: 'ACTIVE' },
            select: {
                id: true,
                season: true,
                league: { select: { externalId: true } },
            },
        });
        if (mode === 'live') {
            await this.syncLiveAcrossChampionships(championships);
            return;
        }
        for (const championship of championships) {
            await this.syncChampionship(championship.id);
        }
    }
    async syncLiveAcrossChampionships(championships) {
        if (championships.length === 0) {
            return;
        }
        const competitionIds = [
            ...new Set(championships.map(item => item.league.externalId)),
        ];
        const remoteMatches = await this.footballDataClient.getMatches({
            status: 'IN_PLAY,PAUSED',
            competitions: competitionIds.join(','),
        });
        const championshipIdsToScore = new Set();
        for (const remote of remoteMatches) {
            const result = await this.prisma.fixture.updateMany({
                where: { externalId: remote.id },
                data: (0, fixture_sync_mapper_js_1.buildFixtureUpdateData)(remote),
            });
            if (result.count > 0) {
                const fixture = await this.prisma.fixture.findUnique({
                    where: { externalId: remote.id },
                    select: { championshipId: true },
                });
                if (fixture) {
                    championshipIdsToScore.add(fixture.championshipId);
                }
            }
        }
        for (const championshipId of championshipIdsToScore) {
            await this.scoringService.syncScoresForChampionship(championshipId);
        }
    }
};
exports.SyncFixturesService = SyncFixturesService;
exports.SyncFixturesService = SyncFixturesService = SyncFixturesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        football_data_client_js_1.FootballDataClient,
        scoring_service_js_1.ScoringService])
], SyncFixturesService);
//# sourceMappingURL=sync-fixtures.service.js.map