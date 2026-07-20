import { PredictionReminderService } from '../../application/services/prediction-reminder.service.js';
export declare class NotificationsController {
    private readonly predictionReminderService;
    constructor(predictionReminderService: PredictionReminderService);
    sendPredictionReminders(): Promise<{
        ok: true;
    }>;
}
