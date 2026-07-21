import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { RankingService } from '../../application/services/ranking.service.js';
export declare class RankingsController {
    private readonly rankingService;
    constructor(rankingService: RankingService);
    getContext(user: AuthUser, poolId: number): Promise<import("../../application/services/ranking.service.js").RankingContext>;
    list(user: AuthUser, poolId?: string, round?: string): Promise<import("../../application/services/ranking.service.js").RankingListItem[]>;
}
