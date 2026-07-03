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
const identity_module_js_1 = require("../identity/identity.module.js");
const championship_service_js_1 = require("./application/services/championship.service.js");
const fixture_service_js_1 = require("./application/services/fixture.service.js");
const championships_controller_js_1 = require("./infrastructure/http/championships.controller.js");
const fixtures_controller_js_1 = require("./infrastructure/http/fixtures.controller.js");
let SportsModule = class SportsModule {
};
exports.SportsModule = SportsModule;
exports.SportsModule = SportsModule = __decorate([
    (0, common_1.Module)({
        imports: [identity_module_js_1.IdentityModule],
        controllers: [championships_controller_js_1.ChampionshipsController, fixtures_controller_js_1.FixturesController],
        providers: [championship_service_js_1.ChampionshipService, fixture_service_js_1.FixtureService],
        exports: [championship_service_js_1.ChampionshipService, fixture_service_js_1.FixtureService],
    })
], SportsModule);
//# sourceMappingURL=sports.module.js.map