import type { CupPhase } from '../../../../../generated/prisma/client.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import type { SubmitPredictionDto } from '../dtos/submit-prediction.dto.js';
import { RankingService } from './ranking.service.js';
import { ScoringService } from './scoring.service.js';
export interface PredictionFixtureResponse {
    id: number;
    poolId: number;
    poolName: string;
    poolPosition: number;
    participantId: number;
    participantName: string;
    isOwnPrediction: boolean;
    championshipName: string;
    round: number | null;
    phase: CupPhase | null;
    homeTeam: string;
    awayTeam: string;
    homeTeamLogo: string;
    awayTeamLogo: string;
    date: string;
    matchStatus: 'SCHEDULED' | 'LIVE' | 'FINISHED';
    officialHomeScore: number | null;
    officialAwayScore: number | null;
    earnedPoints: number | null;
    prediction: {
        fixtureId: number;
        predictedHomeScore: number;
        predictedAwayScore: number;
        selectedPlayerId: number | null;
    } | null;
}
export declare class PredictionService {
    private readonly prisma;
    private readonly rankingService;
    private readonly scoringService;
    constructor(prisma: PrismaService, rankingService: RankingService, scoringService: ScoringService);
    listForUser(user: AuthUser): Promise<PredictionFixtureResponse[]>;
    listByPoolAndFixture(poolId: number, fixtureId: number, user: AuthUser): Promise<PredictionFixtureResponse[]>;
    submit(dto: SubmitPredictionDto, user: AuthUser): Promise<PredictionFixtureResponse>;
    private loadActiveMembersByPool;
    private loadEarnedPointsByKey;
    private toFixtureRow;
    private findAccessiblePools;
    private findAccessiblePoolById;
    private toMatchStatus;
}
