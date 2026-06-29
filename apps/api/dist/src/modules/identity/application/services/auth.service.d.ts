import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { LoginDto } from '../dtos/login.dto.js';
import type { RegisterDto } from '../dtos/register.dto.js';
import type { AuthResponse, AuthUser } from '../types/auth-user.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    validateUser(userId: number): Promise<AuthUser | null>;
    private buildAuthResponse;
    private toAuthUser;
}
