import { PredictionReminderService } from '../../application/services/prediction-reminder.service.js';
export declare class PredictionReminderScheduler {
    private readonly predictionReminderService;
    private readonly logger;
    constructor(predictionReminderService: PredictionReminderService);
    sendMorningReminders(): Promise<void>;
}
