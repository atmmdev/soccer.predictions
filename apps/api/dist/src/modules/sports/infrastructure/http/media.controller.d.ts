import type { Response } from 'express';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import { TeamLogoStorage } from '../storage/team-logo.storage.js';
export declare class MediaController {
    private readonly prisma;
    private readonly teamLogoStorage;
    constructor(prisma: PrismaService, teamLogoStorage: TeamLogoStorage);
    getTeamLogo(externalId: number, response: Response): Promise<void>;
}
