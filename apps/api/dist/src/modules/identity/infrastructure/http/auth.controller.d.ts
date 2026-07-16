import { ForgotPasswordDto } from '../../application/dtos/forgot-password.dto.js';
import { LoginDto } from '../../application/dtos/login.dto.js';
import { RegisterDto } from '../../application/dtos/register.dto.js';
import { ResendVerificationDto } from '../../application/dtos/resend-verification.dto.js';
import { ResetPasswordDto } from '../../application/dtos/reset-password.dto.js';
import { UpdateProfileDto } from '../../application/dtos/update-profile.dto.js';
import { VerifyEmailDto } from '../../application/dtos/verify-email.dto.js';
import { AuthService } from '../../application/services/auth.service.js';
import { EmailVerificationService } from '../../application/services/email-verification.service.js';
import { PasswordResetService } from '../../application/services/password-reset.service.js';
import { UserService } from '../../application/services/user.service.js';
import type { AuthUser } from '../../application/types/auth-user.js';
export declare class AuthController {
    private readonly authService;
    private readonly passwordResetService;
    private readonly emailVerificationService;
    private readonly userService;
    constructor(authService: AuthService, passwordResetService: PasswordResetService, emailVerificationService: EmailVerificationService, userService: UserService);
    register(dto: RegisterDto): Promise<import("../../application/services/auth.service.js").RegisterResult>;
    login(dto: LoginDto): Promise<import("../../application/types/auth-user.js").AuthResponse>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<import("../../application/types/auth-user.js").AuthResponse>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
    }>;
    me(user: AuthUser): {
        user: AuthUser;
    };
    updateMe(user: AuthUser, dto: UpdateProfileDto): Promise<{
        user: AuthUser;
    }>;
}
