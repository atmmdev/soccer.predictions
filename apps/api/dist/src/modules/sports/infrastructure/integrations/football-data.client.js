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
exports.FootballDataClient = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const CATALOG_CACHE_TTL_MS = 60 * 60 * 1000;
const MIN_REQUEST_INTERVAL_MS = 6_500;
let FootballDataClient = class FootballDataClient {
    configService;
    token;
    baseUrl;
    cache = new Map();
    lastRequestAt = 0;
    requestQueue = Promise.resolve();
    constructor(configService) {
        this.configService = configService;
        this.token = this.configService.get('FOOTBALL_DATA_TOKEN', '');
        this.baseUrl = this.configService.get('FOOTBALL_DATA_BASE_URL', 'https://api.football-data.org/v4');
    }
    assertConfigured() {
        if (!this.token) {
            throw new common_1.ServiceUnavailableException('Football Data não configurada. Defina FOOTBALL_DATA_TOKEN no .env da API.');
        }
    }
    async listCompetitions() {
        return this.getCached('competitions', async () => {
            const response = await this.request('/competitions');
            return response.competitions ?? [];
        });
    }
    async getCompetition(competitionIdOrCode) {
        return this.request(`/competitions/${competitionIdOrCode}`);
    }
    async getCompetitionMatches(competitionIdOrCode, season) {
        const params = {};
        if (season) {
            params.season = season.toString();
        }
        const response = await this.request(`/competitions/${competitionIdOrCode}/matches`, params);
        return response.matches ?? [];
    }
    async getMatches(params) {
        const query = {};
        if (params.status) {
            query.status = params.status;
        }
        if (params.dateFrom) {
            query.dateFrom = params.dateFrom;
        }
        if (params.dateTo) {
            query.dateTo = params.dateTo;
        }
        if (params.competitions) {
            query.competitions = params.competitions;
        }
        const response = await this.request('/matches', query);
        return response.matches ?? [];
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
    async request(path, params = {}) {
        this.assertConfigured();
        const url = new URL(`${this.baseUrl}${path}`);
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.set(key, value);
        }
        return this.enqueue(async () => {
            let response;
            try {
                response = await fetch(url, {
                    headers: {
                        'X-Auth-Token': this.token,
                    },
                });
            }
            catch (error) {
                const detail = error instanceof Error ? error.message : 'falha de rede desconhecida';
                throw new common_1.BadGatewayException(`Não foi possível conectar à Football Data API: (${detail}).`);
            }
            if (!response.ok) {
                let detail = `status ${response.status}`;
                try {
                    const body = (await response.json());
                    if (body.message) {
                        detail = body.message;
                    }
                }
                catch {
                }
                throw new common_1.BadGatewayException(`Football Data API retornou erro: ${detail}`);
            }
            return (await response.json());
        });
    }
    enqueue(task) {
        const run = this.requestQueue.then(async () => {
            const waitMs = Math.max(0, MIN_REQUEST_INTERVAL_MS - (Date.now() - this.lastRequestAt));
            if (waitMs > 0) {
                await new Promise(resolve => setTimeout(resolve, waitMs));
            }
            this.lastRequestAt = Date.now();
            return task();
        });
        this.requestQueue = run.then(() => undefined, () => undefined);
        return run;
    }
};
exports.FootballDataClient = FootballDataClient;
exports.FootballDataClient = FootballDataClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FootballDataClient);
//# sourceMappingURL=football-data.client.js.map