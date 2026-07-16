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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramOAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let InstagramOAuthService = class InstagramOAuthService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    getAuthorizationUrl() {
        const clientId = this.configService.getOrThrow('INSTAGRAM_CLIENT_ID');
        const redirectUri = this.configService.getOrThrow('INSTAGRAM_CALLBACK_URL');
        const url = new URL('https://www.instagram.com/oauth/authorize');
        url.searchParams.set('client_id', clientId);
        url.searchParams.set('redirect_uri', redirectUri);
        url.searchParams.set('scope', 'instagram_business_basic');
        url.searchParams.set('response_type', 'code');
        return url.toString();
    }
    async getProfileFromCode(code) {
        const clientId = this.configService.getOrThrow('INSTAGRAM_CLIENT_ID');
        const clientSecret = this.configService.getOrThrow('INSTAGRAM_CLIENT_SECRET');
        const redirectUri = this.configService.getOrThrow('INSTAGRAM_CALLBACK_URL');
        const tokenBody = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            code,
        });
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: tokenBody.toString(),
        });
        if (!tokenResponse.ok) {
            throw new Error('Não foi possível autenticar com o Instagram');
        }
        const tokenData = (await tokenResponse.json());
        const accessToken = tokenData.access_token;
        const userId = String(tokenData.user_id);
        const profileUrl = new URL(`https://graph.instagram.com/v21.0/${userId}`);
        profileUrl.searchParams.set('fields', 'id,username,name,profile_picture_url');
        profileUrl.searchParams.set('access_token', accessToken);
        const profileResponse = await fetch(profileUrl.toString());
        if (!profileResponse.ok) {
            return {
                providerId: userId,
                name: `Instagram ${userId}`,
                username: userId,
                avatarUrl: null,
            };
        }
        const profile = (await profileResponse.json());
        return {
            providerId: profile.id,
            name: profile.name ?? profile.username,
            username: profile.username,
            avatarUrl: profile.profile_picture_url ?? null,
        };
    }
};
exports.InstagramOAuthService = InstagramOAuthService;
exports.InstagramOAuthService = InstagramOAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], InstagramOAuthService);
//# sourceMappingURL=instagram-oauth.service.js.map