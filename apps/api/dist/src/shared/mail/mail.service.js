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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
let MailService = MailService_1 = class MailService {
    configService;
    logger = new common_1.Logger(MailService_1.name);
    resend;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('RESEND_API_KEY');
        this.resend = apiKey ? new resend_1.Resend(apiKey) : null;
    }
    isEnabled() {
        return this.configService.get('EMAIL_ENABLED', 'false') === 'true';
    }
    async send(input) {
        if (!this.isEnabled()) {
            this.logger.log(`[email disabled] to=${input.to} subject="${input.subject}"`);
            const links = [...input.html.matchAll(/href="(https?:\/\/[^"]+)"/g)].map((match) => match[1]);
            for (const link of links) {
                this.logger.log(`Link: ${link}`);
            }
            return false;
        }
        const from = this.configService.getOrThrow('MAIL_FROM');
        if (!this.resend) {
            this.logger.warn(`EMAIL_ENABLED=true mas RESEND_API_KEY ausente. E-mail para ${input.to} não enviado.`);
            this.logger.log(`subject="${input.subject}" to=${input.to}`);
            return false;
        }
        const result = await this.resend.emails.send({
            from,
            to: input.to,
            subject: input.subject,
            html: input.html,
        });
        if (result.error) {
            this.logger.error(`Falha ao enviar e-mail para ${input.to}: ${result.error.message}`);
            throw new Error(result.error.message);
        }
        return true;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map