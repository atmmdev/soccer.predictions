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
exports.RankingsController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_js_1 = require("../../../identity/infrastructure/http/current-user.decorator.js");
const jwt_auth_guard_js_1 = require("../../../identity/infrastructure/http/jwt-auth.guard.js");
const ranking_service_js_1 = require("../../application/services/ranking.service.js");
let RankingsController = class RankingsController {
    rankingService;
    constructor(rankingService) {
        this.rankingService = rankingService;
    }
    getContext(user, poolId) {
        return this.rankingService.getContextForPool(user, poolId);
    }
    list(user, poolId, round) {
        const parsedPoolId = poolId !== undefined && poolId.length > 0 ? Number(poolId) : undefined;
        const parsedRound = round !== undefined && round.length > 0 ? Number(round) : undefined;
        return this.rankingService.listForUser(user, Number.isInteger(parsedPoolId) ? parsedPoolId : undefined, Number.isInteger(parsedRound) ? parsedRound : undefined);
    }
};
exports.RankingsController = RankingsController;
__decorate([
    (0, common_1.Get)('context'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('poolId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "getContext", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('poolId')),
    __param(2, (0, common_1.Query)('round')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], RankingsController.prototype, "list", null);
exports.RankingsController = RankingsController = __decorate([
    (0, common_1.Controller)('rankings'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ranking_service_js_1.RankingService])
], RankingsController);
//# sourceMappingURL=rankings.controller.js.map