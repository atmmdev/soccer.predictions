import { ScoringService } from '../../../betting/application/services/scoring.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { FootballDataClient } from '../../infrastructure/integrations/football-data.client.js';
export declare class SyncFixturesService {
    private readonly prisma;
    private readonly footballDataClient;
    private readonly scoringService;
    private readonly logger;
    constructor(prisma: PrismaService, footballDataClient: FootballDataClient, scoringService: ScoringService);
    syncChampionship(championshipId: number): Promise<number>;
    syncActiveChampionships(mode?: 'all' | 'live'): Promise<void>;
    private syncLiveAcrossChampionships;
}
