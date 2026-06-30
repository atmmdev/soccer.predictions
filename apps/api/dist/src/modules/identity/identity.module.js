"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_service_js_1 = require("./application/services/auth.service.js");
const instagram_oauth_service_js_1 = require("./application/services/instagram-oauth.service.js");
const auth_controller_js_1 = require("./infrastructure/http/auth.controller.js");
const google_auth_guard_js_1 = require("./infrastructure/http/google-auth.guard.js");
const google_strategy_js_1 = require("./infrastructure/http/google.strategy.js");
const jwt_strategy_js_1 = require("./infrastructure/http/jwt.strategy.js");
const oauth_controller_js_1 = require("./infrastructure/http/oauth.controller.js");
let IdentityModule = class IdentityModule {
};
exports.IdentityModule = IdentityModule;
exports.IdentityModule = IdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const expiresIn = configService.get('JWT_EXPIRES_IN', '7d');
                    return {
                        secret: configService.getOrThrow('JWT_SECRET'),
                        signOptions: { expiresIn: expiresIn },
                    };
                },
            }),
        ],
        controllers: [auth_controller_js_1.AuthController, oauth_controller_js_1.OAuthController],
        providers: [
            auth_service_js_1.AuthService,
            instagram_oauth_service_js_1.InstagramOAuthService,
            jwt_strategy_js_1.JwtStrategy,
            google_strategy_js_1.GoogleStrategy,
            google_auth_guard_js_1.GoogleAuthGuard,
        ],
        exports: [auth_service_js_1.AuthService, jwt_1.JwtModule, passport_1.PassportModule],
    })
], IdentityModule);
//# sourceMappingURL=identity.module.js.map