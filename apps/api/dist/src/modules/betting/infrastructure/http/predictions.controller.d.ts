import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { SubmitPredictionDto } from '../../application/dtos/submit-prediction.dto.js';
import { PredictionService } from '../../application/services/prediction.service.js';
export declare class PredictionsController {
    private readonly predictionService;
    constructor(predictionService: PredictionService);
    list(user: AuthUser): Promise<import("../../application/services/prediction.service.js").PredictionFixtureResponse[]>;
    submit(dto: SubmitPredictionDto, user: AuthUser): Promise<import("../../application/services/prediction.service.js").PredictionFixtureResponse>;
}
