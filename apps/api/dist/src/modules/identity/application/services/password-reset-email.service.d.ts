import { ConfigService } from '@nestjs/config';
export declare class PasswordResetEmailService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    sendResetLink(email: string, resetUrl: string): Promise<void>;
}
