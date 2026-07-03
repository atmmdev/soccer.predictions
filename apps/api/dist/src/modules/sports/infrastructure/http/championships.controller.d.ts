import { ChampionshipService } from '../../application/services/championship.service.js';
export declare class ChampionshipsController {
    private readonly championshipService;
    constructor(championshipService: ChampionshipService);
    listActive(): import("../../../../../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: number;
        name: string;
        country: string;
        type: import("../../../../../generated/prisma/enums.js").ChampionshipType;
        leagueId: number;
        season: number;
        flags: string;
        status: import("../../../../../generated/prisma/enums.js").ChampionshipStatus;
    }[]>;
}
