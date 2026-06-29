import { LoginDto } from '../../application/dtos/login.dto.js';
import { RegisterDto } from '../../application/dtos/register.dto.js';
import { AuthService } from '../../application/services/auth.service.js';
import type { AuthUser } from '../../application/types/auth-user.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("../../application/types/auth-user.js").AuthResponse>;
    login(dto: LoginDto): Promise<import("../../application/types/auth-user.js").AuthResponse>;
    me(user: AuthUser): {
        user: AuthUser;
    };
}
