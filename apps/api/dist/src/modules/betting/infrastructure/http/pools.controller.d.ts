import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { CreatePoolDto } from '../../application/dtos/create-pool.dto.js';
import { JoinPoolDto } from '../../application/dtos/join-pool.dto.js';
import { UpdatePoolStatusDto } from '../../application/dtos/update-pool-status.dto.js';
import { PoolService } from '../../application/services/pool.service.js';
export declare class PoolsController {
    private readonly poolService;
    constructor(poolService: PoolService);
    list(user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem[]>;
    join(dto: JoinPoolDto, user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem>;
    getById(id: number, user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem>;
    create(dto: CreatePoolDto, user: AuthUser): Promise<import("../../application/services/pool.service.js").CreatePoolResult>;
    updateStatus(id: number, dto: UpdatePoolStatusDto, user: AuthUser): Promise<import("../../application/services/pool.service.js").PoolListItem>;
}
