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
const cup_phase_mapper_js_1 = require("../utils/cup-phase.mapper.js");
const fixture_status_mapper_js_1 = require("../utils/fixture-status.mapper.js");
const football_data_client_js_1 = require("../../infrastructure/integrations/football-data.client.js");
const IMPORT_TRANSACTION_TIMEOUT_MS = 120_000;
let ImportChampionshipService = class ImportChampionshipService {
    prisma;
    footballDataClient;
    constructor(prisma, footballDataClient) {
        this.prisma = prisma;
        this.footballDataClient = footballDataClient;
    }
    async import(dto) {
        const competition = await this.footballDataClient.getCompetition(dto.leagueId);
        if (!competition) {
            throw new common_1.NotFoundException('Competição ou temporada não encontrada na Football Data API');
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
        const matches = await this.footballDataClient.getCompetitionMatches(dto.leagueId, dto.season);
        if (matches.length === 0) {
            throw new common_1.NotFoundException('Nenhum jogo encontrado para esta competição e temporada');
        }
        const championshipType = competition.type?.toUpperCase() === 'CUP' ? 'CUP' : 'LEAGUE';
        const currentYear = new Date().getFullYear();
        const isCurrentSeason = dto.season === currentYear;
        const status = dto.active ? 'ACTIVE' : 'INACTIVE';
        const countryName = competition.area?.name ?? '';
        const countryFlag = competition.area?.flag ?? competition.emblem ?? '';
        const championship = await this.prisma.$transaction(async (tx) => {
            const league = await tx.league.upsert({
                where: { externalId: dto.leagueId },
                update: {
                    name: competition.name,
                    country: countryName,
                    type: competition.type ?? undefined,
                },
                create: {
                    externalId: dto.leagueId,
                    name: competition.name,
                    country: countryName,
                    type: competition.type ?? undefined,
                },
            });
            const createdChampionship = await tx.championship.create({
                data: {
                    leagueId: league.id,
                    season: dto.season,
                    name: competition.name,
                    country: countryName,
                    flags: countryFlag,
                    type: championshipType,
                    status,
                    isCurrentSeason,
                    allowNewPools: isCurrentSeason && status === 'ACTIVE',
                },
            });
            await this.persistFixtures(tx, createdChampionship.id, matches);
            return createdChampionship;
        }, {
            maxWait: 10_000,
            timeout: IMPORT_TRANSACTION_TIMEOUT_MS,
        });
        return this.toListItem(championship);
    }
    async persistFixtures(tx, championshipId, matches) {
        const teamsByExternalId = new Map();
        for (const match of matches) {
            if (match.homeTeam?.id) {
                teamsByExternalId.set(match.homeTeam.id, {
                    externalId: match.homeTeam.id,
                    name: match.homeTeam.name,
                    logo: match.homeTeam.crest ?? '',
                });
            }
            if (match.awayTeam?.id) {
                teamsByExternalId.set(match.awayTeam.id, {
                    externalId: match.awayTeam.id,
                    name: match.awayTeam.name,
                    logo: match.awayTeam.crest ?? '',
                });
            }
        }
        const teamIdByExternalId = new Map();
        for (const team of teamsByExternalId.values()) {
            const upserted = await tx.team.upsert({
                where: { externalId: team.externalId },
                update: {
                    name: team.name,
                    logo: team.logo,
                },
                create: {
                    externalId: team.externalId,
                    name: team.name,
                    logo: team.logo,
                },
            });
            teamIdByExternalId.set(team.externalId, upserted.id);
        }
        for (const match of matches) {
            const homeTeamId = teamIdByExternalId.get(match.homeTeam.id);
            const awayTeamId = teamIdByExternalId.get(match.awayTeam.id);
            if (!homeTeamId || !awayTeamId) {
                continue;
            }
            const status = (0, fixture_status_mapper_js_1.mapFootballDataFixtureStatus)(match.status);
            await tx.fixture.upsert({
                where: { externalId: match.id },
                update: {
                    championshipId,
                    homeTeamId,
                    awayTeamId,
                    date: new Date(match.utcDate),
                    status,
                    homeScore: match.score.fullTime.home,
                    awayScore: match.score.fullTime.away,
                    round: match.matchday,
                    phase: (0, cup_phase_mapper_js_1.mapStageToCupPhase)(match.stage),
                },
                create: {
                    externalId: match.id,
                    championshipId,
                    homeTeamId,
                    awayTeamId,
                    date: new Date(match.utcDate),
                    status,
                    homeScore: match.score.fullTime.home,
                    awayScore: match.score.fullTime.away,
                    round: match.matchday,
                    phase: (0, cup_phase_mapper_js_1.mapStageToCupPhase)(match.stage),
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
        football_data_client_js_1.FootballDataClient])
], ImportChampionshipService);
//# sourceMappingURL=import-championship.service.js.map