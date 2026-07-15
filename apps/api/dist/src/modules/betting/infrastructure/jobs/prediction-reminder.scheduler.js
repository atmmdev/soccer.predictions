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
var PredictionReminderScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionReminderScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prediction_reminder_service_js_1 = require("../../application/services/prediction-reminder.service.js");
let PredictionReminderScheduler = PredictionReminderScheduler_1 = class PredictionReminderScheduler {
    predictionReminderService;
    logger = new common_1.Logger(PredictionReminderScheduler_1.name);
    constructor(predictionReminderService) {
        this.predictionReminderService = predictionReminderService;
    }
    async sendMorningReminders() {
        this.logger.log('Iniciando envio de lembretes de palpites');
        await this.predictionReminderService.sendDailyReminders();
    }
};
exports.PredictionReminderScheduler = PredictionReminderScheduler;
__decorate([
    (0, schedule_1.Cron)('0 9 * * *', { timeZone: 'America/Sao_Paulo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PredictionReminderScheduler.prototype, "sendMorningReminders", null);
exports.PredictionReminderScheduler = PredictionReminderScheduler = PredictionReminderScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prediction_reminder_service_js_1.PredictionReminderService])
], PredictionReminderScheduler);
//# sourceMappingURL=prediction-reminder.scheduler.js.map