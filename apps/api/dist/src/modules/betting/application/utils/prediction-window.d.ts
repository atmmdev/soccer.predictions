import type { FixtureStatus } from '../../../../../generated/prisma/client.js';
export declare function canEditPrediction(fixture: {
    date: Date;
    status: FixtureStatus;
}, now?: Date): boolean;
export declare function getPredictionLockMessage(fixture: {
    date: Date;
    status: FixtureStatus;
}, now?: Date): string;
