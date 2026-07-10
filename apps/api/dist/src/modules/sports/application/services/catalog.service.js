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
const api_football_client_js_1 = require("../../infrastructure/integrations/api-football.client.js");
let CatalogService = class CatalogService {
    apiFootballClient;
    constructor(apiFootballClient) {
        this.apiFootballClient = apiFootballClient;
    }
    async listCountries() {
        const countries = await this.apiFootballClient.getCountries();
        return countries
            .map(country => ({
            name: country.name,
            code: country.code ?? '',
            flag: country.flag ?? '',
        }))
            .filter(country => country.name.length > 0)
            .sort((left, right) => left.name.localeCompare(right.name));
    }
    async listLeagues(country, season) {
        const leagues = await this.apiFootballClient.getLeagues(country, season);
        return leagues
            .map(item => ({
            leagueId: item.league.id,
            name: item.league.name,
            type: item.league.type.toLowerCase() === 'cup'
                ? 'CUP'
                : 'LEAGUE',
            country: item.country.name,
            code: item.country.code ?? '',
            flag: item.country.flag ?? '',
            seasons: item.seasons
                .map(entry => entry.year)
                .sort((left, right) => right - left),
        }))
            .sort((left, right) => left.name.localeCompare(right.name));
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_football_client_js_1.ApiFootballClient])
], CatalogService);
//# sourceMappingURL=catalog.service.js.map