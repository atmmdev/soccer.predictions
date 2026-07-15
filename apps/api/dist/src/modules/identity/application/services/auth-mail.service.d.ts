import { ConfigService } from '@nestjs/config';
import { MailService } from '../../../../shared/mail/mail.service.js';
import { PrismaService } from '../../../../shared/prisma/prisma.service.js';
export declare class AuthMailService {
    private readonly mailService;
    private readonly configService;
    private readonly prisma;
    private readonly logger;
    constructor(mailService: MailService, configService: ConfigService, prisma: PrismaService);
    getWebOrigin(): string;
    sendWelcomeVerification(params: {
        userId: number;
        email: string;
        name: string;
        rawToken: string;
    }): Promise<void>;
    sendVerificationResend(params: {
        userId: number;
        email: string;
        name: string;
        rawToken: string;
    }): Promise<void>;
    sendPasswordReset(params: {
        userId: number;
        email: string;
        name: string;
        resetUrl: string;
    }): Promise<void>;
    sendPasswordChanged(params: {
        userId: number;
        email: string;
        name: string;
    }): Promise<void>;
    sendPredictionReminder(params: {
        userId: number;
        email: string;
        name: string;
        fixtures: Array<{
            homeTeam: string;
            awayTeam: string;
            kickoffLabel: string;
            poolName: string;
        }>;
    }): Promise<boolean>;
    sendRankingUpdated(params: {
        userId: number;
        email: string;
        name: string;
        poolId: number;
        poolName: string;
        championshipName: string;
        recipientPosition: number;
        recipientPoints: number;
        standings: Array<{
            position: number;
            name: string;
            points: number;
            isRecipient: boolean;
        }>;
    }): Promise<boolean>;
    createRawToken(): string;
    hashToken(token: string): string;
    todayKeyAmericaSaoPaulo(date?: Date): string;
    private tryLogDispatch;
}
