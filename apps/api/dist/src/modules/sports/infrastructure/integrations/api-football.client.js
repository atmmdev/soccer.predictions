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
exports.ApiFootballClient = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const CATALOG_CACHE_TTL_MS = 60 * 60 * 1000;
let ApiFootballClient = class ApiFootballClient {
    configService;
    apiKey;
    baseUrl;
    cache = new Map();
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('API_FOOTBALL_KEY', '');
        this.baseUrl = this.configService.get('API_FOOTBALL_BASE_URL', 'https://v3.football.api-sports.io');
    }
    assertConfigured() {
        if (!this.apiKey) {
            throw new common_1.ServiceUnavailableException('API Football não configurada. Defina API_FOOTBALL_KEY no .env da API.');
        }
    }
    async getCountries() {
        return this.getCached('countries', () => this.fetchAllPages('/countries'));
    }
    async getLeagues(country, season) {
        const params = { country };
        if (season) {
            params.season = season.toString();
        }
        const cacheKey = `leagues:${country}:${season ?? 'all'}`;
        return this.getCached(cacheKey, () => this.fetchAllPages('/leagues', params));
    }
    async getLeagueById(leagueId, season) {
        const response = await this.request('/leagues', {
            id: leagueId.toString(),
            season: season.toString(),
        });
        return response.response[0] ?? null;
    }
    async getFixtures(leagueId, season) {
        return this.fetchAllPages('/fixtures', {
            league: leagueId.toString(),
            season: season.toString(),
        });
    }
    async getFixturesByIds(fixtureIds) {
        if (fixtureIds.length === 0) {
            return [];
        }
        const chunks = [];
        for (let index = 0; index < fixtureIds.length; index += 20) {
            chunks.push(fixtureIds.slice(index, index + 20));
        }
        const results = [];
        for (const chunk of chunks) {
            const response = await this.request('/fixtures', {
                ids: chunk.join('-'),
            });
            results.push(...response.response);
        }
        return results;
    }
    async getLineups(fixtureExternalId) {
        const response = await this.request('/fixtures/lineups', {
            fixture: fixtureExternalId.toString(),
        });
        return response.response;
    }
    async getFixtureEvents(fixtureExternalId) {
        const response = await this.request('/fixtures/events', {
            fixture: fixtureExternalId.toString(),
        });
        return response.response;
    }
    async getCached(key, loader) {
        const cached = this.cache.get(key);
        if (cached && cached.expiresAt > Date.now()) {
            return cached.value;
        }
        const value = await loader();
        this.cache.set(key, {
            value,
            expiresAt: Date.now() + CATALOG_CACHE_TTL_MS,
        });
        return value;
    }
    async fetchAllPages(path, params = {}) {
        const items = [];
        let page = 1;
        let totalPages = 1;
        do {
            const response = await this.request(path, {
                ...params,
                page: page.toString(),
            });
            items.push(...response.response);
            totalPages = response.paging?.total ?? 1;
            page += 1;
        } while (page <= totalPages);
        return items;
    }
    async request(path, params = {}) {
        this.assertConfigured();
        const url = new URL(`${this.baseUrl}${path}`);
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, value);
        }
        let response;
        try {
            response = await fetch(url, {
                headers: {
                    'x-apisports-key': this.apiKey,
                },
            });
        }
        catch (error) {
            const detail = error instanceof Error ? error.message : 'falha de rede desconhecida';
            throw new common_1.BadGatewayException(`Não foi possível conectar à API Football: (${detail}).`);
        }
        if (!response.ok) {
            throw new common_1.BadGatewayException(`API Football retornou status ${response.status}`);
        }
        const body = (await response.json());
        if (body.errors && Object.keys(body.errors).length > 0) {
            const message = Object.values(body.errors).join(' ');
            throw new common_1.BadGatewayException(message || 'Erro ao consultar API Football');
        }
        return body;
    }
};
exports.ApiFootballClient = ApiFootballClient;
exports.ApiFootballClient = ApiFootballClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ApiFootballClient);
//# sourceMappingURL=api-football.client.js.map