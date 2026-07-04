import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';
export declare class SyncFixturesService {
    private readonly prisma;
    private readonly apiFootballClient;
    private readonly logger;
    constructor(prisma: PrismaService, apiFootballClient: ApiFootballClient);
    syncChampionship(championshipId: number): Promise<number>;
    syncActiveChampionships(mode?: 'all' | 'live'): Promise<void>;
    private syncLiveFixtures;
    private resolveGoalScorers;
}
