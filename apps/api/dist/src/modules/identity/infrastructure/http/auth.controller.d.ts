import { ForgotPasswordDto } from '../../application/dtos/forgot-password.dto.js';
import { LoginDto } from '../../application/dtos/login.dto.js';
import { RegisterDto } from '../../application/dtos/register.dto.js';
import { ResetPasswordDto } from '../../application/dtos/reset-password.dto.js';
import { AuthService } from '../../application/services/auth.service.js';
import { PasswordResetService } from '../../application/services/password-reset.service.js';
import type { AuthUser } from '../../application/types/auth-user.js';
export declare class AuthController {
    private readonly authService;
    private readonly passwordResetService;
    constructor(authService: AuthService, passwordResetService: PasswordResetService);
    register(dto: RegisterDto): Promise<import("../../application/types/auth-user.js").AuthResponse>;
    login(dto: LoginDto): Promise<import("../../application/types/auth-user.js").AuthResponse>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    me(user: AuthUser): {
        user: AuthUser;
    };
}
