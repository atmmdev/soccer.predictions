import { PrismaService } from '../../shared/prisma/prisma.service.js';
export declare class HealthController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
}
