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
exports.CatalogService = void 0;
const common_1 = require("@nestjs/common");
const football_data_client_js_1 = require("../../infrastructure/integrations/football-data.client.js");
function seasonYear(startDate) {
    if (!startDate) {
        return null;
    }
    const year = Number.parseInt(startDate.slice(0, 4), 10);
    return Number.isFinite(year) ? year : null;
}
function competitionSeasons(competition) {
    const years = new Set();
    for (const season of competition.seasons ?? []) {
        const year = seasonYear(season.startDate);
        if (year) {
            years.add(year);
        }
    }
    const current = seasonYear(competition.currentSeason?.startDate);
    if (current) {
        years.add(current);
    }
    if (years.size === 0) {
        years.add(new Date().getFullYear());
    }
    return [...years].sort((left, right) => right - left);
}
function mapCompetitionType(type) {
    return type?.toUpperCase() === 'CUP' ? 'CUP' : 'LEAGUE';
}
let CatalogService = class CatalogService {
    footballDataClient;
    constructor(footballDataClient) {
        this.footballDataClient = footballDataClient;
    }
    async listCountries() {
        const competitions = await this.footballDataClient.listCompetitions();
        const byName = new Map();
        for (const competition of competitions) {
            const name = competition.area?.name?.trim();
            if (!name) {
                continue;
            }
            if (!byName.has(name)) {
                byName.set(name, {
                    name,
                    code: competition.area?.code ?? '',
                    flag: competition.area?.flag ?? '',
                });
            }
        }
        return [...byName.values()].sort((left, right) => left.name.localeCompare(right.name));
    }
    async listLeagues(country, season) {
        const competitions = await this.footballDataClient.listCompetitions();
        return competitions
            .filter(competition => competition.area?.name === country)
            .map(competition => {
            const seasons = competitionSeasons(competition).filter(year => season ? year === season : true);
            return {
                leagueId: competition.id,
                name: competition.name,
                type: mapCompetitionType(competition.type),
                country: competition.area?.name ?? country,
                code: competition.area?.code ?? '',
                flag: competition.area?.flag ?? competition.emblem ?? '',
                seasons: seasons.length > 0
                    ? seasons
                    : competitionSeasons(competition),
            };
        })
            .filter(league => league.seasons.length > 0)
            .sort((left, right) => left.name.localeCompare(right.name));
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [football_data_client_js_1.FootballDataClient])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map