"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BettingModule = void 0;
const common_1 = require("@nestjs/common");
const roles_guard_js_1 = require("../../shared/auth/roles.guard.js");
const identity_module_js_1 = require("../identity/identity.module.js");
const participant_service_js_1 = require("./application/services/participant.service.js");
const pool_service_js_1 = require("./application/services/pool.service.js");
const prediction_service_js_1 = require("./application/services/prediction.service.js");
const ranking_service_js_1 = require("./application/services/ranking.service.js");
const scoring_service_js_1 = require("./application/services/scoring.service.js");
const participants_controller_js_1 = require("./infrastructure/http/participants.controller.js");
const pools_controller_js_1 = require("./infrastructure/http/pools.controller.js");
const predictions_controller_js_1 = require("./infrastructure/http/predictions.controller.js");
const rankings_controller_js_1 = require("./infrastructure/http/rankings.controller.js");
let BettingModule = class BettingModule {
};
exports.BettingModule = BettingModule;
exports.BettingModule = BettingModule = __decorate([
    (0, common_1.Module)({
        imports: [identity_module_js_1.IdentityModule],
        controllers: [pools_controller_js_1.PoolsController, predictions_controller_js_1.PredictionsController, rankings_controller_js_1.RankingsController, participants_controller_js_1.ParticipantsController],
        providers: [pool_service_js_1.PoolService, prediction_service_js_1.PredictionService, scoring_service_js_1.ScoringService, ranking_service_js_1.RankingService, participant_service_js_1.ParticipantService, roles_guard_js_1.RolesGuard],
        exports: [pool_service_js_1.PoolService, prediction_service_js_1.PredictionService, scoring_service_js_1.ScoringService, ranking_service_js_1.RankingService, participant_service_js_1.ParticipantService],
    })
], BettingModule);
//# sourceMappingURL=betting.module.js.map