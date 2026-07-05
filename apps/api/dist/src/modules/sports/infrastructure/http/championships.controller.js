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
exports.ChampionshipsController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_js_1 = require("../../../../shared/auth/roles.decorator.js");
const roles_guard_js_1 = require("../../../../shared/auth/roles.guard.js");
const jwt_auth_guard_js_1 = require("../../../identity/infrastructure/http/jwt-auth.guard.js");
const import_championship_dto_js_1 = require("../../application/dtos/import-championship.dto.js");
const update_championship_status_dto_js_1 = require("../../application/dtos/update-championship-status.dto.js");
const catalog_service_js_1 = require("../../application/services/catalog.service.js");
const championship_service_js_1 = require("../../application/services/championship.service.js");
const import_championship_service_js_1 = require("../../application/services/import-championship.service.js");
const sync_fixtures_service_js_1 = require("../../application/services/sync-fixtures.service.js");
let ChampionshipsController = class ChampionshipsController {
    championshipService;
    catalogService;
    importChampionshipService;
    syncFixturesService;
    constructor(championshipService, catalogService, importChampionshipService, syncFixturesService) {
        this.championshipService = championshipService;
        this.catalogService = catalogService;
        this.importChampionshipService = importChampionshipService;
        this.syncFixturesService = syncFixturesService;
    }
    list() {
        return this.championshipService.listAll();
    }
    listActive() {
        return this.championshipService.listActive();
    }
    listCountries() {
        return this.catalogService.listCountries();
    }
    listLeagues(country, season) {
        return this.catalogService.listLeagues(country, season ? Number.parseInt(season, 10) : undefined);
    }
    import(dto) {
        return this.importChampionshipService.import(dto);
    }
    sync(id) {
        return this.syncFixturesService.syncChampionship(id);
    }
    updateStatus(id, dto) {
        return this.championshipService.updateStatus(id, dto.active);
    }
};
exports.ChampionshipsController = ChampionshipsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChampionshipsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChampionshipsController.prototype, "listActive", null);
__decorate([
    (0, common_1.Get)('catalog/countries'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChampionshipsController.prototype, "listCountries", null);
__decorate([
    (0, common_1.Get)('catalog/leagues'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __param(0, (0, common_1.Query)('country')),
    __param(1, (0, common_1.Query)('season')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChampionshipsController.prototype, "listLeagues", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [import_championship_dto_js_1.ImportChampionshipDto]),
    __metadata("design:returntype", void 0)
], ChampionshipsController.prototype, "import", null);
__decorate([
    (0, common_1.Post)(':id/sync'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChampionshipsController.prototype, "sync", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)('ADMIN', 'SUPER_ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_championship_status_dto_js_1.UpdateChampionshipStatusDto]),
    __metadata("design:returntype", void 0)
], ChampionshipsController.prototype, "updateStatus", null);
exports.ChampionshipsController = ChampionshipsController = __decorate([
    (0, common_1.Controller)('championships'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    __metadata("design:paramtypes", [championship_service_js_1.ChampionshipService,
        catalog_service_js_1.CatalogService,
        import_championship_service_js_1.ImportChampionshipService,
        sync_fixtures_service_js_1.SyncFixturesService])
], ChampionshipsController);
//# sourceMappingURL=championships.controller.js.map