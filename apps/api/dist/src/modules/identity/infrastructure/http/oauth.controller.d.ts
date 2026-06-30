import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { InstagramOAuthService } from '../../application/services/instagram-oauth.service.js';
import { AuthService } from '../../application/services/auth.service.js';
import type { AuthUser } from '../../application/types/auth-user.js';
export declare class OAuthController {
    private readonly authService;
    private readonly instagramOAuthService;
    private readonly configService;
    constructor(authService: AuthService, instagramOAuthService: InstagramOAuthService, configService: ConfigService);
    googleAuth(): void;
    googleCallback(request: {
        user: AuthUser;
    }, response: Response): void;
    instagramAuth(response: Response): void;
    instagramCallback(code: string | undefined, error: string | undefined, response: Response): Promise<void>;
    private redirectWithAuth;
    private redirectWithError;
}
