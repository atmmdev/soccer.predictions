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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_js_1 = require("../../../../shared/auth/roles.decorator.js");
const roles_guard_js_1 = require("../../../../shared/auth/roles.guard.js");
const jwt_auth_guard_js_1 = require("../../../identity/infrastructure/http/jwt-auth.guard.js");
const prediction_reminder_service_js_1 = require("../../application/services/prediction-reminder.service.js");
let NotificationsController = class NotificationsController {
    predictionReminderService;
    constructor(predictionReminderService) {
        this.predictionReminderService = predictionReminderService;
    }
    async sendPredictionReminders() {
        await this.predictionReminderService.sendDailyReminders();
        return { ok: true };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Post)('prediction-reminders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendPredictionReminders", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __metadata("design:paramtypes", [prediction_reminder_service_js_1.PredictionReminderService])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map