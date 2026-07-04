import type { ChampionshipType } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
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
export declare class ChampionshipService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listAll(): Promise<ChampionshipListItem[]>;
    listActive(): Promise<ChampionshipListItem[]>;
}
