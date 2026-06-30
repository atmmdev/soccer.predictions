import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface InstagramTokenResponse {
  access_token: string;
  user_id: number | string;
}

interface InstagramProfileResponse {
  id: string;
  username: string;
  name?: string;
}

@Injectable()
export class InstagramOAuthService {
  constructor(private readonly configService: ConfigService) {}

  getAuthorizationUrl(): string {
    const clientId = this.configService.getOrThrow<string>(
      'INSTAGRAM_CLIENT_ID',
    );
    const redirectUri = this.configService.getOrThrow<string>(
      'INSTAGRAM_CALLBACK_URL',
    );

    const url = new URL('https://www.instagram.com/oauth/authorize');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('scope', 'instagram_business_basic');
    url.searchParams.set('response_type', 'code');

    return url.toString();
  }

  async getProfileFromCode(code: string): Promise<{
    providerId: string;
    name: string;
    username: string;
  }> {
    const clientId = this.configService.getOrThrow<string>(
      'INSTAGRAM_CLIENT_ID',
    );
    const clientSecret = this.configService.getOrThrow<string>(
      'INSTAGRAM_CLIENT_SECRET',
    );
    const redirectUri = this.configService.getOrThrow<string>(
      'INSTAGRAM_CALLBACK_URL',
    );

    const tokenBody = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code,
    });

    const tokenResponse = await fetch(
      'https://api.instagram.com/oauth/access_token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenBody.toString(),
      },
    );

    if (!tokenResponse.ok) {
      throw new Error('Não foi possível autenticar com o Instagram');
    }

    const tokenData = (await tokenResponse.json()) as InstagramTokenResponse;
    const accessToken = tokenData.access_token;
    const userId = String(tokenData.user_id);

    const profileUrl = new URL(`https://graph.instagram.com/v21.0/${userId}`);
    profileUrl.searchParams.set(
      'fields',
      'id,username,name,profile_picture_url',
    );
    profileUrl.searchParams.set('access_token', accessToken);

    const profileResponse = await fetch(profileUrl.toString());

    if (!profileResponse.ok) {
      return {
        providerId: userId,
        name: `Instagram ${userId}`,
        username: userId,
      };
    }

    const profile =
      (await profileResponse.json()) as InstagramProfileResponse;

    return {
      providerId: profile.id,
      name: profile.name ?? profile.username,
      username: profile.username,
    };
  }
}
