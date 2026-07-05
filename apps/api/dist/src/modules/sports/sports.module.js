"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportsModule = void 0;
const common_1 = require("@nestjs/common");
const betting_module_js_1 = require("../betting/betting.module.js");
const roles_guard_js_1 = require("../../shared/auth/roles.guard.js");
const identity_module_js_1 = require("../identity/identity.module.js");
const catalog_service_js_1 = require("./application/services/catalog.service.js");
const championship_service_js_1 = require("./application/services/championship.service.js");
const fixture_service_js_1 = require("./application/services/fixture.service.js");
const import_championship_service_js_1 = require("./application/services/import-championship.service.js");
const lineup_service_js_1 = require("./application/services/lineup.service.js");
const sync_fixtures_service_js_1 = require("./application/services/sync-fixtures.service.js");
const fixture_sync_scheduler_js_1 = require("./infrastructure/jobs/fixture-sync.scheduler.js");
const api_football_client_js_1 = require("./infrastructure/integrations/api-football.client.js");
const championships_controller_js_1 = require("./infrastructure/http/championships.controller.js");
const fixtures_controller_js_1 = require("./infrastructure/http/fixtures.controller.js");
let SportsModule = class SportsModule {
};
exports.SportsModule = SportsModule;
exports.SportsModule = SportsModule = __decorate([
    (0, common_1.Module)({
        imports: [identity_module_js_1.IdentityModule, betting_module_js_1.BettingModule],
        controllers: [championships_controller_js_1.ChampionshipsController, fixtures_controller_js_1.FixturesController],
        providers: [
            api_football_client_js_1.ApiFootballClient,
            catalog_service_js_1.CatalogService,
            championship_service_js_1.ChampionshipService,
            fixture_service_js_1.FixtureService,
            import_championship_service_js_1.ImportChampionshipService,
            lineup_service_js_1.LineupService,
            sync_fixtures_service_js_1.SyncFixturesService,
            fixture_sync_scheduler_js_1.FixtureSyncScheduler,
            roles_guard_js_1.RolesGuard,
        ],
        exports: [
            championship_service_js_1.ChampionshipService,
            fixture_service_js_1.FixtureService,
            sync_fixtures_service_js_1.SyncFixturesService,
            lineup_service_js_1.LineupService,
        ],
    })
], SportsModule);
//# sourceMappingURL=sports.module.js.map