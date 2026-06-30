import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './application/services/auth.service.js';
import { InstagramOAuthService } from './application/services/instagram-oauth.service.js';
import { AuthController } from './infrastructure/http/auth.controller.js';
import { GoogleAuthGuard } from './infrastructure/http/google-auth.guard.js';
import { GoogleStrategy } from './infrastructure/http/google.strategy.js';
import { JwtStrategy } from './infrastructure/http/jwt.strategy.js';
import { OAuthController } from './infrastructure/http/oauth.controller.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN', '7d');

        return {
          secret: configService.getOrThrow<string>('JWT_SECRET'),
          signOptions: { expiresIn: expiresIn as `${number}d` },
        };
      },
    }),
  ],
  controllers: [AuthController, OAuthController],
  providers: [
    AuthService,
    InstagramOAuthService,
    JwtStrategy,
    GoogleStrategy,
    GoogleAuthGuard,
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class IdentityModule {}
