import type { ChampionshipType, Pool, Prisma } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import type { CreatePoolDto } from '../dtos/create-pool.dto.js';
import type { JoinPoolDto } from '../dtos/join-pool.dto.js';
export interface PoolListItem {
    id: number;
    name: string;
    championshipId: number;
    championshipName: string;
    championshipType: ChampionshipType;
    season: number;
    participantsCount: number;
    inviteCode: string;
    status: Pool['status'];
    scoring: Prisma.JsonValue;
    ownerId: number;
    isOwner: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreatePoolResult {
    pool: PoolListItem;
    user: AuthUser;
}
export declare class PoolService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(user: AuthUser): Promise<PoolListItem[]>;
    getByIdForUser(poolId: number, user: AuthUser): Promise<PoolListItem>;
    create(dto: CreatePoolDto, user: AuthUser): Promise<CreatePoolResult>;
    join(dto: JoinPoolDto, user: AuthUser): Promise<PoolListItem>;
    private resolvePoolOwner;
    private loadPoolListItem;
    private findAccessiblePool;
    private createUniqueInviteCode;
    private toPoolListItem;
}
