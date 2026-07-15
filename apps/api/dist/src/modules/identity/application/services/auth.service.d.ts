import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { LoginDto } from '../dtos/login.dto.js';
import type { RegisterDto } from '../dtos/register.dto.js';
import type { AuthResponse, AuthUser } from '../types/auth-user.js';
import type { OAuthProfile } from '../types/oauth-profile.js';
import { EmailVerificationService } from './email-verification.service.js';
export type RegisterResult = AuthResponse | {
    message: string;
    requiresEmailVerification: true;
    email: string;
};
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly emailVerificationService;
    constructor(prisma: PrismaService, jwtService: JwtService, emailVerificationService: EmailVerificationService);
    register(dto: RegisterDto): Promise<RegisterResult>;
    login(dto: LoginDto): Promise<AuthResponse>;
    validateOAuthLogin(profile: OAuthProfile): Promise<AuthUser>;
    validateUser(userId: number): Promise<AuthUser | null>;
    buildAuthResponseFromUser(user: AuthUser): AuthResponse;
    private buildAuthResponse;
    private toAuthUser;
}
