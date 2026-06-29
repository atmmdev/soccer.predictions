"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const betting_module_js_1 = require("./modules/betting/betting.module.js");
const health_module_js_1 = require("./modules/health/health.module.js");
const identity_module_js_1 = require("./modules/identity/identity.module.js");
const sports_module_js_1 = require("./modules/sports/sports.module.js");
const prisma_module_js_1 = require("./shared/prisma/prisma.module.js");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_js_1.PrismaModule,
            health_module_js_1.HealthModule,
            identity_module_js_1.IdentityModule,
            sports_module_js_1.SportsModule,
            betting_module_js_1.BettingModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map