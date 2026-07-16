export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'PARTICIPANT';

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
