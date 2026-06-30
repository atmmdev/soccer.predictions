import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { LoginDto } from '../dtos/login.dto.js';
import type { RegisterDto } from '../dtos/register.dto.js';
import type { AuthResponse, AuthUser } from '../types/auth-user.js';
import type { OAuthProfile } from '../types/oauth-profile.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    validateOAuthLogin(profile: OAuthProfile): Promise<AuthUser>;
    validateUser(userId: number): Promise<AuthUser | null>;
    buildAuthResponseFromUser(user: AuthUser): AuthResponse;
    private buildAuthResponse;
    private toAuthUser;
}
