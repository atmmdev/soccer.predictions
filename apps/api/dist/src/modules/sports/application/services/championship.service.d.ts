import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
export declare class ChampionshipService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
