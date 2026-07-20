"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthMailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_crypto_1 = require("node:crypto");
const mail_service_js_1 = require("../../../../shared/mail/mail.service.js");
const mail_templates_js_1 = require("../../../../shared/mail/mail.templates.js");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
let AuthMailService = AuthMailService_1 = class AuthMailService {
    mailService;
    configService;
    prisma;
    logger = new common_1.Logger(AuthMailService_1.name);
    constructor(mailService, configService, prisma) {
        this.mailService = mailService;
        this.configService = configService;
        this.prisma = prisma;
    }
    getWebOrigin() {
        return this.configService.getOrThrow('WEB_ORIGIN');
    }
    async sendWelcomeVerification(params) {
        const webOrigin = this.getWebOrigin();
        const verifyUrl = new URL('/verify-email', webOrigin);
        verifyUrl.searchParams.set('token', params.rawToken);
        const template = (0, mail_templates_js_1.welcomeVerifyEmail)({
            name: params.name,
            verifyUrl: verifyUrl.toString(),
            webOrigin,
        });
        await this.mailService.send({
            to: params.email,
            subject: template.subject,
            html: template.html,
        });
        await this.tryLogDispatch(params.userId, 'WELCOME_VERIFY');
    }
    async sendVerificationResend(params) {
        const webOrigin = this.getWebOrigin();
        const verifyUrl = new URL('/verify-email', webOrigin);
        verifyUrl.searchParams.set('token', params.rawToken);
        const template = (0, mail_templates_js_1.welcomeVerifyEmail)({
            name: params.name,
            verifyUrl: verifyUrl.toString(),
            webOrigin,
        });
        await this.mailService.send({
            to: params.email,
            subject: template.subject,
            html: template.html,
        });
        await this.tryLogDispatch(params.userId, 'VERIFICATION_RESEND');
    }
    async sendPasswordReset(params) {
        const webOrigin = this.getWebOrigin();
        const template = (0, mail_templates_js_1.passwordResetEmail)({
            name: params.name,
            resetUrl: params.resetUrl,
            webOrigin,
        });
        await this.mailService.send({
            to: params.email,
            subject: template.subject,
            html: template.html,
        });
        await this.tryLogDispatch(params.userId, 'PASSWORD_RESET');
    }
    async sendPasswordChanged(params) {
        const template = (0, mail_templates_js_1.passwordChangedEmail)({
            name: params.name,
            webOrigin: this.getWebOrigin(),
        });
        await this.mailService.send({
            to: params.email,
            subject: template.subject,
            html: template.html,
        });
        await this.tryLogDispatch(params.userId, 'PASSWORD_CHANGED');
    }
    async sendPredictionReminder(params) {
        const dayKey = this.todayKeyAmericaSaoPaulo();
        const alreadySent = await this.prisma.emailDispatchLog.findUnique({
            where: {
                userId_type_dayKey: {
                    userId: params.userId,
                    type: 'PREDICTION_REMINDER',
                    dayKey,
                },
            },
        });
        if (alreadySent) {
            return false;
        }
        const webOrigin = this.getWebOrigin();
        const predictionsUrl = new URL('/predictions', webOrigin).toString();
        const template = (0, mail_templates_js_1.predictionReminderEmail)({
            name: params.name,
            predictionsUrl,
            webOrigin,
            fixtures: params.fixtures,
        });
        const delivered = await this.mailService.send({
            to: params.email,
            subject: template.subject,
            html: template.html,
        });
        if (!delivered) {
            return false;
        }
        await this.prisma.emailDispatchLog.create({
            data: {
                userId: params.userId,
                type: 'PREDICTION_REMINDER',
                dayKey,
            },
        });
        return true;
    }
    async sendRankingUpdated(params) {
        const dayKey = `${this.todayKeyAmericaSaoPaulo()}-pool-${params.poolId}`;
        const alreadySent = await this.prisma.emailDispatchLog.findUnique({
            where: {
                userId_type_dayKey: {
                    userId: params.userId,
                    type: 'RANKING_UPDATED',
                    dayKey,
                },
            },
        });
        if (alreadySent) {
            this.logger.debug(`Ranking update já enviado hoje para user=${params.userId} pool=${params.poolId}`);
            return false;
        }
        const webOrigin = this.getWebOrigin();
        const rankingsUrl = new URL('/rankings', webOrigin);
        rankingsUrl.searchParams.set('poolId', String(params.poolId));
        const template = (0, mail_templates_js_1.rankingUpdatedEmail)({
            name: params.name,
            poolName: params.poolName,
            championshipName: params.championshipName,
            rankingsUrl: rankingsUrl.toString(),
            webOrigin,
            recipientPosition: params.recipientPosition,
            recipientPoints: params.recipientPoints,
            standings: params.standings,
        });
        const delivered = await this.mailService.send({
            to: params.email,
            subject: template.subject,
            html: template.html,
        });
        if (!delivered) {
            this.logger.warn(`Ranking update não entregue (mail desabilitado ou Resend indisponível) para ${params.email}`);
            return false;
        }
        await this.prisma.emailDispatchLog.create({
            data: {
                userId: params.userId,
                type: 'RANKING_UPDATED',
                dayKey,
            },
        });
        return true;
    }
    createRawToken() {
        return (0, node_crypto_1.randomBytes)(32).toString('hex');
    }
    hashToken(token) {
        return (0, node_crypto_1.createHash)('sha256').update(token).digest('hex');
    }
    todayKeyAmericaSaoPaulo(date = new Date()) {
        return new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(date);
    }
    async tryLogDispatch(userId, type) {
        try {
            await this.prisma.emailDispatchLog.create({
                data: {
                    userId,
                    type,
                    dayKey: this.todayKeyAmericaSaoPaulo(),
                },
            });
        }
        catch (error) {
            this.logger.debug(`Dispatch log skip for user=${userId} type=${type}: ${String(error)}`);
        }
    }
};
exports.AuthMailService = AuthMailService;
exports.AuthMailService = AuthMailService = AuthMailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_service_js_1.MailService,
        config_1.ConfigService,
        prisma_service_js_1.PrismaService])
], AuthMailService);
//# sourceMappingURL=auth-mail.service.js.map