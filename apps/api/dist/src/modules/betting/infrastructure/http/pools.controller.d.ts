import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { CreatePoolDto } from '../../application/dtos/create-pool.dto.js';
import { UpdatePoolDto } from '../../application/dtos/update-pool.dto.js';
import { UpdatePoolStatusDto } from '../../application/dtos/update-pool-status.dto.js';
import { PoolService } from '../../application/services/pool.service.js';
export declare class PoolsController {
    private readonly poolService;
    constructor(poolService: PoolService);
    list(user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem[]>;
    discover(user: AuthUser): Promise<import("../../application/services/pool.service.js").DiscoverablePoolItem[]>;
    requestAccess(id: number, user: AuthUser): Promise<import("../../application/services/pool.service.js").DiscoverablePoolItem>;
    approveMember(id: number, userId: number, user: AuthUser): Promise<{
        userId: number;
        status: import("../../../../../generated/prisma/enums.js").PoolUserStatus;
    }>;
    rejectMember(id: number, userId: number, user: AuthUser): Promise<{
        userId: number;
        status: import("../../../../../generated/prisma/enums.js").PoolUserStatus;
    }>;
    getById(id: number, user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem>;
    create(dto: CreatePoolDto, user: AuthUser): Promise<import("../../application/services/pool.service.js").CreatePoolResult>;
    updateStatus(id: number, dto: UpdatePoolStatusDto, user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem>;
    update(id: number, dto: UpdatePoolDto, user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem>;
}
