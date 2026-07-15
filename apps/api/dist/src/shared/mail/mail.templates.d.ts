export type MailTemplate = {
    subject: string;
    html: string;
};
export declare function welcomeVerifyEmail(params: {
    name: string;
    verifyUrl: string;
}): MailTemplate;
export declare function passwordResetEmail(params: {
    name: string;
    resetUrl: string;
}): MailTemplate;
export declare function passwordChangedEmail(params: {
    name: string;
}): MailTemplate;
export declare function predictionReminderEmail(params: {
    name: string;
    predictionsUrl: string;
    fixtures: Array<{
        homeTeam: string;
        awayTeam: string;
        kickoffLabel: string;
        poolName: string;
    }>;
}): MailTemplate;
