import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { UpdateProfileDto } from '../dtos/update-profile.dto.js';
import type { AuthUser } from '../types/auth-user.js';
export interface PoolDelegateCandidate {
    id: number;
    name: string;
    email: string;
    avatarDataUrl: string | null;
    role: 'ADMIN' | 'PARTICIPANT';
}
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: number, dto: UpdateProfileDto): Promise<AuthUser>;
    listPoolDelegateCandidates(): Promise<PoolDelegateCandidate[]>;
}
