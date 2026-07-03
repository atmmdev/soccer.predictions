import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import type { SubmitPredictionDto } from '../dtos/submit-prediction.dto.js';
export interface PredictionFixtureResponse {
    id: number;
    poolId: number;
    poolName: string;
    poolPosition: number;
    participantId: number;
    participantName: string;
    isOwnPrediction: boolean;
    championshipName: string;
    round: number;
    homeTeam: string;
    awayTeam: string;
    date: string;
    matchStatus: 'SCHEDULED' | 'LIVE' | 'FINISHED';
    officialHomeScore: number | null;
    officialAwayScore: number | null;
    prediction: {
        fixtureId: number;
        predictedHomeScore: number;
        predictedAwayScore: number;
        selectedPlayerId: number | null;
    } | null;
}
export declare class PredictionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listForUser(user: AuthUser): Promise<PredictionFixtureResponse[]>;
    submit(dto: SubmitPredictionDto, user: AuthUser): Promise<PredictionFixtureResponse>;
    private canViewAllPoolPredictions;
    private loadActiveMembersByPool;
    private toFixtureRow;
    private findAccessiblePools;
    private findAccessiblePoolById;
    private toMatchStatus;
}
