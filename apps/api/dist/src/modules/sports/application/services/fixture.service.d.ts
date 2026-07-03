import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
export interface FixtureListItem {
    id: number;
    championshipName: string;
    round: number;
    homeTeam: string;
    awayTeam: string;
    date: string;
    status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
    officialHomeScore: number | null;
    officialAwayScore: number | null;
}
export declare class FixtureService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(user: AuthUser): Promise<FixtureListItem[]>;
    private resolveAccessibleChampionshipIds;
    private toMatchStatus;
}
