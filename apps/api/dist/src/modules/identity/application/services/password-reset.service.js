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
var PasswordResetService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_crypto_1 = require("node:crypto");
const bcryptjs_1 = require("bcryptjs");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const auth_mail_service_js_1 = require("./auth-mail.service.js");
const PASSWORD_SALT_ROUNDS = 10;
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;
let PasswordResetService = PasswordResetService_1 = class PasswordResetService {
    prisma;
    configService;
    authMailService;
    logger = new common_1.Logger(PasswordResetService_1.name);
    constructor(prisma, configService, authMailService) {
        this.prisma = prisma;
        this.configService = configService;
        this.authMailService = authMailService;
    }
    async requestReset(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user || !user.password) {
            return this.genericSuccessMessage();
        }
        await this.prisma.passwordResetToken.updateMany({
            where: {
                userId: user.id,
                usedAt: null,
            },
            data: {
                usedAt: new Date(),
            },
        });
        const rawToken = (0, node_crypto_1.randomBytes)(32).toString('hex');
        const tokenHash = this.hashToken(rawToken);
        const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);
        await this.prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt,
            },
        });
        const webOrigin = this.configService.getOrThrow('WEB_ORIGIN');
        const resetUrl = new URL('/reset-password', webOrigin);
        resetUrl.searchParams.set('token', rawToken);
        await this.authMailService.sendPasswordReset({
            userId: user.id,
            email: user.email,
            name: user.name,
            resetUrl: resetUrl.toString(),
        });
        return this.genericSuccessMessage();
    }
    async resetPassword(dto) {
        const tokenHash = this.hashToken(dto.token);
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!resetToken || resetToken.usedAt) {
            throw new common_1.UnauthorizedException('Link de redefinição inválido ou expirado');
        }
        if (resetToken.expiresAt.getTime() < Date.now()) {
            throw new common_1.UnauthorizedException('Link de redefinição inválido ou expirado');
        }
        if (!resetToken.user.password) {
            throw new common_1.BadRequestException('Esta conta usa login social. Entre com Google ou Instagram.');
        }
        const passwordHash = await (0, bcryptjs_1.hash)(dto.password, PASSWORD_SALT_ROUNDS);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: resetToken.userId },
                data: { password: passwordHash },
            }),
            this.prisma.passwordResetToken.update({
                where: { id: resetToken.id },
                data: { usedAt: new Date() },
            }),
        ]);
        try {
            await this.authMailService.sendPasswordChanged({
                userId: resetToken.user.id,
                email: resetToken.user.email,
                name: resetToken.user.name,
            });
        }
        catch (error) {
            this.logger.warn(`Falha ao enviar e-mail de senha alterada para ${resetToken.user.email}: ${String(error)}`);
        }
        return {
            message: 'Senha redefinida com sucesso. Você já pode entrar.',
        };
    }
    hashToken(token) {
        return (0, node_crypto_1.createHash)('sha256').update(token).digest('hex');
    }
    genericSuccessMessage() {
        return {
            message: 'Se o e-mail estiver cadastrado, enviaremos instruções para redefinir a senha.',
        };
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = PasswordResetService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        config_1.ConfigService,
        auth_mail_service_js_1.AuthMailService])
], PasswordResetService);
//# sourceMappingURL=password-reset.service.js.map