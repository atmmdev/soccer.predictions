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
exports.FixturesController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_js_1 = require("../../../identity/infrastructure/http/current-user.decorator.js");
const jwt_auth_guard_js_1 = require("../../../identity/infrastructure/http/jwt-auth.guard.js");
const fixture_service_js_1 = require("../../application/services/fixture.service.js");
const lineup_service_js_1 = require("../../application/services/lineup.service.js");
let FixturesController = class FixturesController {
    fixtureService;
    lineupService;
    constructor(fixtureService, lineupService) {
        this.fixtureService = fixtureService;
        this.lineupService = lineupService;
    }
    list(user) {
        return this.fixtureService.listForUser(user);
    }
    getLineup(id) {
        return this.lineupService.getFixtureLineup(id);
    }
};
exports.FixturesController = FixturesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FixturesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/lineup'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FixturesController.prototype, "getLineup", null);
exports.FixturesController = FixturesController = __decorate([
    (0, common_1.Controller)('fixtures'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [fixture_service_js_1.FixtureService,
        lineup_service_js_1.LineupService])
], FixturesController);
//# sourceMappingURL=fixtures.controller.js.map