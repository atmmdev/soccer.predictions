import { ScoringService } from '../../../betting/application/services/scoring.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';
export declare class SyncFixturesService {
    private readonly prisma;
    private readonly apiFootballClient;
    private readonly scoringService;
    private readonly logger;
    constructor(prisma: PrismaService, apiFootballClient: ApiFootballClient, scoringService: ScoringService);
    syncChampionship(championshipId: number): Promise<number>;
    syncActiveChampionships(mode?: 'all' | 'live'): Promise<void>;
    private syncLiveFixtures;
    private resolveGoalScorers;
}
