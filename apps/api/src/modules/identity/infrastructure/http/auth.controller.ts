import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

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
import { CurrentUser } from './current-user.decorator.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordResetService: PasswordResetService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.passwordResetService.requestReset(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(dto);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.emailVerificationService.verifyEmail(dto);
  }

  @Post('resend-verification')
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.emailVerificationService.resendVerification(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return { user };
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    return { user: await this.userService.updateProfile(user.id, dto) };
  }
}
