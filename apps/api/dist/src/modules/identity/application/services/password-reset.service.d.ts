import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { ForgotPasswordDto } from '../dtos/forgot-password.dto.js';
import type { ResetPasswordDto } from '../dtos/reset-password.dto.js';
import { AuthMailService } from './auth-mail.service.js';
export declare class PasswordResetService {
    private readonly prisma;
    private readonly configService;
    private readonly authMailService;
    private readonly logger;
    constructor(prisma: PrismaService, configService: ConfigService, authMailService: AuthMailService);
    requestReset(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private hashToken;
    private genericSuccessMessage;
}
