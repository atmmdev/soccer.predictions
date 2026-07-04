import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';
export interface FixtureLineupResponse {
    home: {
        team: {
            id: number;
            name: string;
            flag: string;
        };
        players: Array<{
            id: number;
            name: string;
            teamId: number;
        }>;
    };
    away: {
        team: {
            id: number;
            name: string;
            flag: string;
        };
        players: Array<{
            id: number;
            name: string;
            teamId: number;
        }>;
    };
}
export declare class LineupService {
    private readonly prisma;
    private readonly apiFootballClient;
    constructor(prisma: PrismaService, apiFootballClient: ApiFootballClient);
    getFixtureLineup(fixtureId: number): Promise<FixtureLineupResponse>;
    private mapSide;
}
