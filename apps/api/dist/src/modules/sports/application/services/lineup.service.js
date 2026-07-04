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
exports.LineupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const api_football_client_js_1 = require("../../infrastructure/integrations/api-football.client.js");
let LineupService = class LineupService {
    prisma;
    apiFootballClient;
    constructor(prisma, apiFootballClient) {
        this.prisma = prisma;
        this.apiFootballClient = apiFootballClient;
    }
    async getFixtureLineup(fixtureId) {
        const fixture = await this.prisma.fixture.findUnique({
            where: { id: fixtureId },
            include: {
                homeTeam: true,
                awayTeam: true,
            },
        });
        if (!fixture) {
            throw new common_1.NotFoundException('Jogo não encontrado');
        }
        const lineups = await this.apiFootballClient.getLineups(fixture.externalId);
        if (lineups.length < 2) {
            throw new common_1.NotFoundException('Escalação indisponível para este jogo');
        }
        const homeLineup = lineups.find(item => item.team.id === fixture.homeTeam.externalId) ??
            lineups[0];
        const awayLineup = lineups.find(item => item.team.id === fixture.awayTeam.externalId) ??
            lineups[1];
        return {
            home: this.mapSide(homeLineup, fixture.homeTeam.externalId),
            away: this.mapSide(awayLineup, fixture.awayTeam.externalId),
        };
    }
    mapSide(lineup, teamExternalId) {
        const players = [...lineup.startXI, ...lineup.substitutes].map(entry => ({
            id: entry.player.id,
            name: entry.player.name,
            teamId: teamExternalId,
        }));
        return {
            team: {
                id: teamExternalId,
                name: lineup.team.name,
                flag: lineup.team.logo,
            },
            players,
        };
    }
};
exports.LineupService = LineupService;
exports.LineupService = LineupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        api_football_client_js_1.ApiFootballClient])
], LineupService);
//# sourceMappingURL=lineup.service.js.map