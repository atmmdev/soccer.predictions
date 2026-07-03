import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
export declare class ChampionshipService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
