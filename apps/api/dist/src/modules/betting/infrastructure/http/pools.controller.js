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
exports.PoolsController = void 0;
const common_1 = require("@nestjs/common");
const pool_access_guard_js_1 = require("../../../../shared/auth/pool-access.guard.js");
const pool_owner_guard_js_1 = require("../../../../shared/auth/pool-owner.guard.js");
const current_user_decorator_js_1 = require("../../../identity/infrastructure/http/current-user.decorator.js");
const jwt_auth_guard_js_1 = require("../../../identity/infrastructure/http/jwt-auth.guard.js");
const create_pool_dto_js_1 = require("../../application/dtos/create-pool.dto.js");
const join_pool_dto_js_1 = require("../../application/dtos/join-pool.dto.js");
const update_pool_dto_js_1 = require("../../application/dtos/update-pool.dto.js");
const update_pool_status_dto_js_1 = require("../../application/dtos/update-pool-status.dto.js");
const pool_service_js_1 = require("../../application/services/pool.service.js");
let PoolsController = class PoolsController {
    poolService;
    constructor(poolService) {
        this.poolService = poolService;
    }
    list(user) {
        return this.poolService.listForUser(user);
    }
    discover(user) {
        return this.poolService.discoverForUser(user);
    }
    join(dto, user) {
        return this.poolService.join(dto, user);
    }
    requestAccess(id, user) {
        return this.poolService.requestAccess(id, user);
    }
    approveMember(id, userId, user) {
        return this.poolService.approveMember(id, userId, user);
    }
    rejectMember(id, userId, user) {
        return this.poolService.rejectMember(id, userId, user);
    }
    getById(id, user) {
        return this.poolService.getByIdForUser(id, user);
    }
    create(dto, user) {
        return this.poolService.create(dto, user);
    }
    updateStatus(id, dto, user) {
        return this.poolService.updateStatus(id, dto, user);
    }
    update(id, dto, user) {
        return this.poolService.update(id, dto, user);
    }
};
exports.PoolsController = PoolsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('discover'),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "discover", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [join_pool_dto_js_1.JoinPoolDto, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "join", null);
__decorate([
    (0, common_1.Post)(':id/request-access'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "requestAccess", null);
__decorate([
    (0, common_1.Post)(':id/members/:userId/approve'),
    (0, common_1.UseGuards)(pool_owner_guard_js_1.PoolOwnerGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(2, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "approveMember", null);
__decorate([
    (0, common_1.Post)(':id/members/:userId/reject'),
    (0, common_1.UseGuards)(pool_owner_guard_js_1.PoolOwnerGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(2, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "rejectMember", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(pool_access_guard_js_1.PoolAccessGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pool_dto_js_1.CreatePoolDto, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(pool_access_guard_js_1.PoolAccessGuard, pool_owner_guard_js_1.PoolOwnerGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pool_status_dto_js_1.UpdatePoolStatusDto, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(pool_access_guard_js_1.PoolAccessGuard, pool_owner_guard_js_1.PoolOwnerGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_pool_dto_js_1.UpdatePoolDto, Object]),
    __metadata("design:returntype", void 0)
], PoolsController.prototype, "update", null);
exports.PoolsController = PoolsController = __decorate([
    (0, common_1.Controller)('pools'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pool_service_js_1.PoolService])
], PoolsController);
//# sourceMappingURL=pools.controller.js.map