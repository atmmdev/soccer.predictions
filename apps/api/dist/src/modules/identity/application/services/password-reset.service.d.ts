import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { ForgotPasswordDto } from '../dtos/forgot-password.dto.js';
import type { ResetPasswordDto } from '../dtos/reset-password.dto.js';
import { PasswordResetEmailService } from './password-reset-email.service.js';
export declare class PasswordResetService {
    private readonly prisma;
    private readonly configService;
    private readonly emailService;
    constructor(prisma: PrismaService, configService: ConfigService, emailService: PasswordResetEmailService);
    requestReset(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private hashToken;
    private genericSuccessMessage;
}
