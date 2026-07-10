import type { ChampionshipType } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { ImportChampionshipDto } from '../dtos/import-championship.dto.js';
import { FootballDataClient } from '../../infrastructure/integrations/football-data.client.js';
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
    private readonly footballDataClient;
    constructor(prisma: PrismaService, footballDataClient: FootballDataClient);
    import(dto: ImportChampionshipDto): Promise<ChampionshipListItem>;
    private persistFixtures;
    private toListItem;
}
