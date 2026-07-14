import type { ChampionshipType, Pool, PoolUserStatus, Prisma } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import type { CreatePoolDto } from '../dtos/create-pool.dto.js';
import type { JoinPoolDto } from '../dtos/join-pool.dto.js';
import type { UpdatePoolDto } from '../dtos/update-pool.dto.js';
import type { UpdatePoolStatusDto } from '../dtos/update-pool-status.dto.js';
export interface PoolListItem {
    id: number;
    name: string;
    championshipId: number;
    championshipName: string;
    championshipType: ChampionshipType;
    season: number;
    participantsCount: number;
    predictionsCount: number;
    inviteCode: string;
    status: Pool['status'];
    scoring: Prisma.JsonValue;
    ownerId: number;
    isOwner: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type DiscoverMembershipStatus = 'PENDING' | 'INACTIVE' | null;
export interface DiscoverablePoolItem {
    id: number;
    name: string;
    championshipName: string;
    championshipType: ChampionshipType;
    season: number;
    participantsCount: number;
    ownerId: number;
    ownerName: string;
    status: Pool['status'];
    membershipStatus: DiscoverMembershipStatus;
}
export interface CreatePoolResult {
    pool: PoolListItem;
    user: AuthUser;
}
export declare class PoolService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(user: AuthUser): Promise<PoolListItem[]>;
    discoverForUser(user: AuthUser): Promise<DiscoverablePoolItem[]>;
    requestAccess(poolId: number, user: AuthUser): Promise<DiscoverablePoolItem>;
    approveMember(poolId: number, memberUserId: number, user: AuthUser): Promise<{
        userId: number;
        status: PoolUserStatus;
    }>;
    rejectMember(poolId: number, memberUserId: number, user: AuthUser): Promise<{
        userId: number;
        status: PoolUserStatus;
    }>;
    getByIdForUser(poolId: number, user: AuthUser): Promise<PoolListItem>;
    create(dto: CreatePoolDto, user: AuthUser): Promise<CreatePoolResult>;
    join(dto: JoinPoolDto, user: AuthUser): Promise<PoolListItem>;
    updateStatus(poolId: number, dto: UpdatePoolStatusDto, user: AuthUser): Promise<PoolListItem>;
    update(poolId: number, dto: UpdatePoolDto, user: AuthUser): Promise<PoolListItem>;
    private resolvePoolOwner;
    private loadPoolListItem;
    private findAccessiblePool;
    private updateMemberStatus;
    private assertPoolOwner;
    private loadDiscoverablePoolItem;
    private toDiscoverablePoolItem;
    private createUniqueInviteCode;
    private toPoolListItem;
}
