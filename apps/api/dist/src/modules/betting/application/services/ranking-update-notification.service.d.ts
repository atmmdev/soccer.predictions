import { AuthMailService } from '../../../identity/application/services/auth-mail.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
export declare class RankingUpdateNotificationService {
    private readonly prisma;
    private readonly authMailService;
    private readonly logger;
    constructor(prisma: PrismaService, authMailService: AuthMailService);
    notifyForChampionship(championshipId: number): Promise<void>;
    private notifyForPool;
}
