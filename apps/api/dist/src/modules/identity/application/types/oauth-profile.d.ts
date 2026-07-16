import type { AuthProvider } from '../../../../../generated/prisma/client.js';
export type OAuthProvider = Extract<AuthProvider, 'GOOGLE' | 'INSTAGRAM'>;
export interface OAuthProfile {
    provider: OAuthProvider;
    providerId: string;
    email?: string | null;
    name: string;
    avatarUrl?: string | null;
}
