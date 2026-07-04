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
var FixtureSyncScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureSyncScheduler = void 0;
const schedule_1 = require("@nestjs/schedule");
const common_1 = require("@nestjs/common");
const sync_fixtures_service_js_1 = require("../../application/services/sync-fixtures.service.js");
let FixtureSyncScheduler = FixtureSyncScheduler_1 = class FixtureSyncScheduler {
    syncFixturesService;
    logger = new common_1.Logger(FixtureSyncScheduler_1.name);
    constructor(syncFixturesService) {
        this.syncFixturesService = syncFixturesService;
    }
    async syncMorning() {
        this.logger.log('Iniciando sync matinal de fixtures');
        await this.syncFixturesService.syncActiveChampionships('all');
    }
    async syncLive() {
        await this.syncFixturesService.syncActiveChampionships('live');
    }
    async syncNightly() {
        this.logger.log('Iniciando sync noturno de fixtures');
        await this.syncFixturesService.syncActiveChampionships('all');
    }
};
exports.FixtureSyncScheduler = FixtureSyncScheduler;
__decorate([
    (0, schedule_1.Cron)('0 6 * * *', { timeZone: 'America/Sao_Paulo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FixtureSyncScheduler.prototype, "syncMorning", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FixtureSyncScheduler.prototype, "syncLive", null);
__decorate([
    (0, schedule_1.Cron)('59 23 * * *', { timeZone: 'America/Sao_Paulo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FixtureSyncScheduler.prototype, "syncNightly", null);
exports.FixtureSyncScheduler = FixtureSyncScheduler = FixtureSyncScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sync_fixtures_service_js_1.SyncFixturesService])
], FixtureSyncScheduler);
//# sourceMappingURL=fixture-sync.scheduler.js.map