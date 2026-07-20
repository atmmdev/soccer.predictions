import { RankingUpdateNotificationService } from '../../../betting/application/services/ranking-update-notification.service.js';
import { ScoringService } from '../../../betting/application/services/scoring.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { FootballDataClient } from '../../infrastructure/integrations/football-data.client.js';
export declare class SyncFixturesService {
    private readonly prisma;
    private readonly footballDataClient;
    private readonly scoringService;
    private readonly rankingUpdateNotificationService;
    private readonly logger;
    constructor(prisma: PrismaService, footballDataClient: FootballDataClient, scoringService: ScoringService, rankingUpdateNotificationService: RankingUpdateNotificationService);
    syncChampionship(championshipId: number, options?: {
        notifyRanking?: boolean;
    }): Promise<number>;
    syncActiveChampionships(mode?: 'all' | 'live', options?: {
        notifyRanking?: boolean;
    }): Promise<void>;
    private syncLiveAcrossChampionships;
}
