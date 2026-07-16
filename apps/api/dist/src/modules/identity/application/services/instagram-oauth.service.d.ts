import { ConfigService } from '@nestjs/config';
export declare class InstagramOAuthService {
    private readonly configService;
    constructor(configService: ConfigService);
    getAuthorizationUrl(): string;
    getProfileFromCode(code: string): Promise<{
        providerId: string;
        name: string;
        username: string;
        avatarUrl: string | null;
    }>;
}
