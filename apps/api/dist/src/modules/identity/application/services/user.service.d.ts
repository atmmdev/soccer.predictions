import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
export interface PoolDelegateCandidate {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'PARTICIPANT';
}
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listPoolDelegateCandidates(): Promise<PoolDelegateCandidate[]>;
}
