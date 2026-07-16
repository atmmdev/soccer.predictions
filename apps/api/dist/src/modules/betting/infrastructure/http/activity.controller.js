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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_js_1 = require("../../../identity/infrastructure/http/current-user.decorator.js");
const jwt_auth_guard_js_1 = require("../../../identity/infrastructure/http/jwt-auth.guard.js");
const activity_service_js_1 = require("../../application/services/activity.service.js");
let ActivityController = class ActivityController {
    activityService;
    constructor(activityService) {
        this.activityService = activityService;
    }
    list(user, limit) {
        const parsedLimit = limit !== undefined && limit.length > 0 ? Number(limit) : undefined;
        return this.activityService.listForUser(user, Number.isFinite(parsedLimit) ? parsedLimit : undefined);
    }
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "list", null);
exports.ActivityController = ActivityController = __decorate([
    (0, common_1.Controller)('activity'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [activity_service_js_1.ActivityService])
], ActivityController);
//# sourceMappingURL=activity.controller.js.map