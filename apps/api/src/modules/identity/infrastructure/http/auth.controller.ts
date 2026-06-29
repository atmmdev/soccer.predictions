import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { LoginDto } from '../../application/dtos/login.dto.js';
import { RegisterDto } from '../../application/dtos/register.dto.js';
import { AuthService } from '../../application/services/auth.service.js';
import type { AuthUser } from '../../application/types/auth-user.js';
import { CurrentUser } from './current-user.decorator.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return { user };
  }
}
