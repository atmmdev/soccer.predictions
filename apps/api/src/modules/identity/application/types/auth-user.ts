import type { UserRole } from '../../../../../generated/prisma/client.js';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  phone: string | null;
  avatarDataUrl: string | null;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}
