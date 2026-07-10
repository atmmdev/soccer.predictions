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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TeamLogoStorage_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamLogoStorage = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const https_1 = __importDefault(require("https"));
const dns_1 = require("dns");
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const promises_2 = require("stream/promises");
const MEDIA_HOST = 'media.api-sports.io';
const DNS_SERVERS = ['8.8.8.8', '1.1.1.1'];
let TeamLogoStorage = TeamLogoStorage_1 = class TeamLogoStorage {
    logger = new common_1.Logger(TeamLogoStorage_1.name);
    storageDir = path_1.default.join(process.cwd(), 'storage', 'team-logos');
    inFlight = new Map();
    resolver = new dns_1.Resolver();
    resolve4;
    constructor() {
        this.resolver.setServers(DNS_SERVERS);
        this.resolve4 = (0, util_1.promisify)(this.resolver.resolve4.bind(this.resolver));
        if (!(0, fs_1.existsSync)(this.storageDir)) {
            (0, fs_1.mkdirSync)(this.storageDir, { recursive: true });
        }
    }
    getPublicUrl(externalId) {
        return `/api/media/teams/${externalId}`;
    }
    getFilePath(externalId) {
        return path_1.default.join(this.storageDir, `${externalId}.png`);
    }
    async hasLocalFile(externalId) {
        try {
            await (0, promises_1.access)(this.getFilePath(externalId));
            return true;
        }
        catch {
            return false;
        }
    }
    async readLocalFile(externalId) {
        try {
            const buffer = await (0, promises_1.readFile)(this.getFilePath(externalId));
            return { buffer, contentType: 'image/png' };
        }
        catch {
            return null;
        }
    }
    toPublicLogoUrl(externalId) {
        return this.getPublicUrl(externalId);
    }
    async ensureLogo(externalId, remoteUrl) {
        if (await this.hasLocalFile(externalId)) {
            return this.getPublicUrl(externalId);
        }
        const pending = this.inFlight.get(externalId);
        if (pending) {
            await pending;
            return this.getPublicUrl(externalId);
        }
        const downloadPromise = this.downloadLogo(externalId, remoteUrl).finally(() => {
            this.inFlight.delete(externalId);
        });
        this.inFlight.set(externalId, downloadPromise);
        await downloadPromise;
        return this.getPublicUrl(externalId);
    }
    async downloadLogo(externalId, remoteUrl) {
        const sourceUrl = remoteUrl && remoteUrl.startsWith('http')
            ? remoteUrl
            : `https://${MEDIA_HOST}/football/teams/${externalId}.png`;
        try {
            await this.fetchToFile(sourceUrl, this.getFilePath(externalId));
            return this.getPublicUrl(externalId);
        }
        catch (error) {
            const detail = error instanceof Error ? error.message : 'erro desconhecido';
            this.logger.warn(`Falha ao baixar logo do time ${externalId}: ${detail}`);
            return null;
        }
    }
    async fetchToFile(url, destination) {
        const parsed = new URL(url);
        const addresses = await this.resolve4(parsed.hostname);
        const ip = addresses[0];
        if (!ip) {
            throw new Error(`DNS sem endereço para ${parsed.hostname}`);
        }
        await new Promise((resolve, reject) => {
            const request = https_1.default.get({
                host: ip,
                servername: parsed.hostname,
                path: `${parsed.pathname}${parsed.search}`,
                headers: {
                    Host: parsed.hostname,
                    'User-Agent': 'Mozilla/5.0 (compatible; SoccerPredictions/1.0)',
                    Accept: 'image/png,image/*;q=0.8,*/*;q=0.5',
                },
            }, async (response) => {
                if (response.statusCode &&
                    response.statusCode >= 300 &&
                    response.statusCode < 400 &&
                    response.headers.location) {
                    response.resume();
                    try {
                        await this.fetchToFile(response.headers.location, destination);
                        resolve();
                    }
                    catch (redirectError) {
                        reject(redirectError);
                    }
                    return;
                }
                if (response.statusCode !== 200) {
                    response.resume();
                    reject(new Error(`HTTP ${response.statusCode ?? 'unknown'} ao baixar ${url}`));
                    return;
                }
                try {
                    await (0, promises_2.pipeline)(response, (0, fs_1.createWriteStream)(destination));
                    resolve();
                }
                catch (streamError) {
                    reject(streamError);
                }
            });
            request.on('error', reject);
        });
    }
};
exports.TeamLogoStorage = TeamLogoStorage;
exports.TeamLogoStorage = TeamLogoStorage = TeamLogoStorage_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TeamLogoStorage);
//# sourceMappingURL=team-logo.storage.js.map