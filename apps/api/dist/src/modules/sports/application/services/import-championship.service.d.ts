import type { ChampionshipType } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { ImportChampionshipDto } from '../dtos/import-championship.dto.js';
import { ApiFootballClient } from '../../infrastructure/integrations/api-football.client.js';
export interface ChampionshipListItem {
    id: number;
    leagueId: number;
    season: number;
    name: string;
    country: string;
    flags: string;
    type: ChampionshipType;
    status: 'ACTIVE' | 'INACTIVE';
}
export declare class ImportChampionshipService {
    private readonly prisma;
    private readonly apiFootballClient;
    constructor(prisma: PrismaService, apiFootballClient: ApiFootballClient);
    import(dto: ImportChampionshipDto): Promise<ChampionshipListItem>;
    private persistFixtures;
    private toListItem;
}
