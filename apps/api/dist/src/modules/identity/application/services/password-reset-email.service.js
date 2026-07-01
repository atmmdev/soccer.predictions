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
var PasswordResetEmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetEmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let PasswordResetEmailService = PasswordResetEmailService_1 = class PasswordResetEmailService {
    configService;
    logger = new common_1.Logger(PasswordResetEmailService_1.name);
    constructor(configService) {
        this.configService = configService;
    }
    async sendResetLink(email, resetUrl) {
        const nodeEnv = this.configService.get('NODE_ENV', 'development');
        if (nodeEnv !== 'production') {
            this.logger.log(`Link de redefinição para ${email}: ${resetUrl}`);
            return;
        }
        this.logger.warn(`Envio de e-mail não configurado. Link de redefinição para ${email} não enviado.`);
    }
};
exports.PasswordResetEmailService = PasswordResetEmailService;
exports.PasswordResetEmailService = PasswordResetEmailService = PasswordResetEmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PasswordResetEmailService);
//# sourceMappingURL=password-reset-email.service.js.map