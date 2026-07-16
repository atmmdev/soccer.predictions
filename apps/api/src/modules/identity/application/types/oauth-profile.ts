import type { AuthProvider } from '../../../../../generated/prisma/client.js';

export type OAuthProvider = Extract<AuthProvider, 'GOOGLE' | 'INSTAGRAM'>;

export interface OAuthProfile {
  provider: OAuthProvider;
  providerId: string;
  email?: string | null;
  name: string;
  /** URL pública da foto no provedor (Google/Instagram). */
  avatarUrl?: string | null;
}
