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
exports.ImportChampionshipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const fixture_status_mapper_js_1 = require("../utils/fixture-status.mapper.js");
const api_football_client_js_1 = require("../../infrastructure/integrations/api-football.client.js");
let ImportChampionshipService = class ImportChampionshipService {
    prisma;
    apiFootballClient;
    constructor(prisma, apiFootballClient) {
        this.prisma = prisma;
        this.apiFootballClient = apiFootballClient;
    }
    async import(dto) {
        const leagueData = await this.apiFootballClient.getLeagueById(dto.leagueId, dto.season);
        if (!leagueData) {
            throw new common_1.NotFoundException('Liga ou temporada não encontrada na API Football');
        }
        const existingLeague = await this.prisma.league.findUnique({
            where: { externalId: dto.leagueId },
            include: {
                championships: {
                    where: { season: dto.season },
                },
            },
        });
        if (existingLeague?.championships.length) {
            throw new common_1.ConflictException('Este campeonato já foi importado para a temporada selecionada');
        }
        const fixtures = await this.apiFootballClient.getFixtures(dto.leagueId, dto.season);
        if (fixtures.length === 0) {
            throw new common_1.NotFoundException('Nenhum jogo encontrado para esta liga e temporada');
        }
        const championshipType = leagueData.league.type.toLowerCase() === 'cup' ? 'CUP' : 'LEAGUE';
        const currentYear = new Date().getFullYear();
        const isCurrentSeason = dto.season === currentYear;
        const status = dto.active ? 'ACTIVE' : 'INACTIVE';
        const championship = await this.prisma.$transaction(async (tx) => {
            const league = await tx.league.upsert({
                where: { externalId: dto.leagueId },
                update: {
                    name: leagueData.league.name,
                    country: leagueData.country.name,
                    type: leagueData.league.type,
                },
                create: {
                    externalId: dto.leagueId,
                    name: leagueData.league.name,
                    country: leagueData.country.name,
                    type: leagueData.league.type,
                },
            });
            const createdChampionship = await tx.championship.create({
                data: {
                    leagueId: league.id,
                    season: dto.season,
                    name: leagueData.league.name,
                    country: leagueData.country.name,
                    flags: leagueData.country.flag ?? '',
                    type: championshipType,
                    status,
                    isCurrentSeason,
                    allowNewPools: isCurrentSeason && status === 'ACTIVE',
                },
            });
            await this.persistFixtures(tx, createdChampionship.id, fixtures);
            return createdChampionship;
        });
        return this.toListItem(championship);
    }
    async persistFixtures(tx, championshipId, fixtures) {
        for (const item of fixtures) {
            const homeTeam = await tx.team.upsert({
                where: { externalId: item.teams.home.id },
                update: {
                    name: item.teams.home.name,
                    logo: item.teams.home.logo,
                },
                create: {
                    externalId: item.teams.home.id,
                    name: item.teams.home.name,
                    logo: item.teams.home.logo,
                },
            });
            const awayTeam = await tx.team.upsert({
                where: { externalId: item.teams.away.id },
                update: {
                    name: item.teams.away.name,
                    logo: item.teams.away.logo,
                },
                create: {
                    externalId: item.teams.away.id,
                    name: item.teams.away.name,
                    logo: item.teams.away.logo,
                },
            });
            const status = (0, fixture_status_mapper_js_1.mapApiFootballFixtureStatus)(item.fixture.status.short);
            await tx.fixture.upsert({
                where: { externalId: item.fixture.id },
                update: {
                    championshipId,
                    homeTeamId: homeTeam.id,
                    awayTeamId: awayTeam.id,
                    date: new Date(item.fixture.date),
                    status,
                    homeScore: item.goals.home,
                    awayScore: item.goals.away,
                    round: (0, fixture_status_mapper_js_1.parseFixtureRound)(item.league.round),
                },
                create: {
                    externalId: item.fixture.id,
                    championshipId,
                    homeTeamId: homeTeam.id,
                    awayTeamId: awayTeam.id,
                    date: new Date(item.fixture.date),
                    status,
                    homeScore: item.goals.home,
                    awayScore: item.goals.away,
                    round: (0, fixture_status_mapper_js_1.parseFixtureRound)(item.league.round),
                },
            });
        }
    }
    toListItem(championship) {
        return {
            id: championship.id,
            leagueId: championship.leagueId,
            season: championship.season,
            name: championship.name,
            country: championship.country,
            flags: championship.flags,
            type: championship.type,
            status: championship.status,
        };
    }
};
exports.ImportChampionshipService = ImportChampionshipService;
exports.ImportChampionshipService = ImportChampionshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        api_football_client_js_1.ApiFootballClient])
], ImportChampionshipService);
//# sourceMappingURL=import-championship.service.js.map