import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

import { InstagramOAuthService } from '../../application/services/instagram-oauth.service.js';
import { AuthService } from '../../application/services/auth.service.js';
import type { AuthUser } from '../../application/types/auth-user.js';
import { GoogleAuthGuard } from './google-auth.guard.js';

@Controller('auth')
export class OAuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly instagramOAuthService: InstagramOAuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth(): void {
    // Redirect handled by Passport
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() request: { user: AuthUser }, @Res() response: Response) {
    return this.redirectWithAuth(response, request.user);
  }

  @Get('instagram')
  instagramAuth(@Res() response: Response) {
    return response.redirect(this.instagramOAuthService.getAuthorizationUrl());
  }

  @Get('instagram/callback')
  async instagramCallback(
    @Query('code') code: string | undefined,
    @Query('error') error: string | undefined,
    @Res() response: Response,
  ) {
    if (error || !code) {
      return this.redirectWithError(
        response,
        'Não foi possível autenticar com o Instagram',
      );
    }

    try {
      const profile =
        await this.instagramOAuthService.getProfileFromCode(code);

      const user = await this.authService.validateOAuthLogin({
        provider: 'INSTAGRAM',
        providerId: profile.providerId,
        email: `instagram+${profile.username}@oauth.soccer.local`,
        name: profile.name,
        avatarUrl: profile.avatarUrl,
      });

      return this.redirectWithAuth(response, user);
    } catch {
      return this.redirectWithError(
        response,
        'Não foi possível autenticar com o Instagram',
      );
    }
  }

  private redirectWithAuth(response: Response, user: AuthUser) {
    const auth = this.authService.buildAuthResponseFromUser(user);
    const webOrigin = this.configService.getOrThrow<string>('WEB_ORIGIN');
    const url = new URL(`${webOrigin}/auth/callback`);
    url.searchParams.set('accessToken', auth.accessToken);

    return response.redirect(url.toString());
  }

  private redirectWithError(response: Response, message: string) {
    const webOrigin = this.configService.getOrThrow<string>('WEB_ORIGIN');
    const url = new URL(`${webOrigin}/auth/callback`);
    url.searchParams.set('error', message);

    return response.redirect(url.toString());
  }
}
