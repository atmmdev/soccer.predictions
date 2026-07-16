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
exports.OAuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const instagram_oauth_service_js_1 = require("../../application/services/instagram-oauth.service.js");
const auth_service_js_1 = require("../../application/services/auth.service.js");
const google_auth_guard_js_1 = require("./google-auth.guard.js");
let OAuthController = class OAuthController {
    authService;
    instagramOAuthService;
    configService;
    constructor(authService, instagramOAuthService, configService) {
        this.authService = authService;
        this.instagramOAuthService = instagramOAuthService;
        this.configService = configService;
    }
    googleAuth() {
    }
    googleCallback(request, response) {
        return this.redirectWithAuth(response, request.user);
    }
    instagramAuth(response) {
        return response.redirect(this.instagramOAuthService.getAuthorizationUrl());
    }
    async instagramCallback(code, error, response) {
        if (error || !code) {
            return this.redirectWithError(response, 'Não foi possível autenticar com o Instagram');
        }
        try {
            const profile = await this.instagramOAuthService.getProfileFromCode(code);
            const user = await this.authService.validateOAuthLogin({
                provider: 'INSTAGRAM',
                providerId: profile.providerId,
                email: `instagram+${profile.username}@oauth.soccer.local`,
                name: profile.name,
                avatarUrl: profile.avatarUrl,
            });
            return this.redirectWithAuth(response, user);
        }
        catch {
            return this.redirectWithError(response, 'Não foi possível autenticar com o Instagram');
        }
    }
    redirectWithAuth(response, user) {
        const auth = this.authService.buildAuthResponseFromUser(user);
        const webOrigin = this.configService.getOrThrow('WEB_ORIGIN');
        const url = new URL(`${webOrigin}/auth/callback`);
        url.searchParams.set('accessToken', auth.accessToken);
        return response.redirect(url.toString());
    }
    redirectWithError(response, message) {
        const webOrigin = this.configService.getOrThrow('WEB_ORIGIN');
        const url = new URL(`${webOrigin}/auth/callback`);
        url.searchParams.set('error', message);
        return response.redirect(url.toString());
    }
};
exports.OAuthController = OAuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_auth_guard_js_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OAuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_auth_guard_js_1.GoogleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OAuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Get)('instagram'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OAuthController.prototype, "instagramAuth", null);
__decorate([
    (0, common_1.Get)('instagram/callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('error')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthController.prototype, "instagramCallback", null);
exports.OAuthController = OAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_js_1.AuthService,
        instagram_oauth_service_js_1.InstagramOAuthService,
        config_1.ConfigService])
], OAuthController);
//# sourceMappingURL=oauth.controller.js.map