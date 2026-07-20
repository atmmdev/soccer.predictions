import { ConfigService } from '@nestjs/config';
export type SendMailInput = {
    to: string;
    subject: string;
    html: string;
};
export declare class MailService {
    private readonly configService;
    private readonly logger;
    private readonly resend;
    constructor(configService: ConfigService);
    isEnabled(): boolean;
    send(input: SendMailInput): Promise<boolean>;
}
