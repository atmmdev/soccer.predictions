import { ChampionshipService } from '../../application/services/championship.service.js';
export declare class ChampionshipsController {
    private readonly championshipService;
    constructor(championshipService: ChampionshipService);
    listActive(): import("../../../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        name: string;
        id: number;
        status: import("../../../../../generated/prisma/enums.js").ChampionshipStatus;
        leagueId: number;
        season: number;
        country: string;
        flags: string;
        type: import("../../../../../generated/prisma/enums.js").ChampionshipType;
    }[]>;
}
