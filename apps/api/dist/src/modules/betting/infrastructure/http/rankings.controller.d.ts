import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { RankingService } from '../../application/services/ranking.service.js';
export declare class RankingsController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    list(user: AuthUser, poolId?: string): Promise<import("../../application/services/ranking.service.js").RankingListItem[]>;
}
