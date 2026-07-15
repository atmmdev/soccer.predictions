import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { ResendVerificationDto } from '../dtos/resend-verification.dto.js';
import type { VerifyEmailDto } from '../dtos/verify-email.dto.js';
import type { AuthResponse } from '../types/auth-user.js';
import { AuthMailService } from './auth-mail.service.js';
export declare class EmailVerificationService {
    private readonly prisma;
    private readonly jwtService;
    private readonly authMailService;
    constructor(prisma: PrismaService, jwtService: JwtService, authMailService: AuthMailService);
    createAndSendWelcomeVerification(user: {
        id: number;
        email: string;
        name: string;
    }): Promise<void>;
    verifyEmail(dto: VerifyEmailDto): Promise<AuthResponse>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
    }>;
    private rotateVerificationToken;
    private buildAuthResponse;
}
