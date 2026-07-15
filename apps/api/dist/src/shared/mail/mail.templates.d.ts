export type MailTemplate = {
    subject: string;
    html: string;
};
export declare function welcomeVerifyEmail(params: {
    name: string;
    verifyUrl: string;
    webOrigin: string;
}): MailTemplate;
export declare function passwordResetEmail(params: {
    name: string;
    resetUrl: string;
    webOrigin: string;
}): MailTemplate;
export declare function passwordChangedEmail(params: {
    name: string;
    webOrigin: string;
}): MailTemplate;
export declare function predictionReminderEmail(params: {
    name: string;
    predictionsUrl: string;
    webOrigin: string;
    fixtures: Array<{
        homeTeam: string;
        awayTeam: string;
        kickoffLabel: string;
        poolName: string;
    }>;
}): MailTemplate;
