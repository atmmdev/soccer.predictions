import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

import { AuthService } from '../../application/services/auth.service.js';
import type { AuthUser } from '../../application/types/auth-user.js';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    try {
      const user = await this.authService.validateOAuthLogin({
        provider: 'GOOGLE',
        providerId: profile.id,
        email: profile.emails?.[0]?.value ?? null,
        name:
          profile.displayName ??
          profile.name?.givenName ??
          'Usuário Google',
        avatarUrl: profile.photos?.[0]?.value ?? null,
      });

      done(null, user);
    } catch (error) {
      done(error as Error, undefined);
    }
  }
}
