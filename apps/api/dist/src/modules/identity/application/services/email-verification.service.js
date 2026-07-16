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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const auth_mail_service_js_1 = require("./auth-mail.service.js");
const VERIFY_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 2 * 60 * 1000;
let EmailVerificationService = class EmailVerificationService {
    prisma;
    jwtService;
    authMailService;
    constructor(prisma, jwtService, authMailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.authMailService = authMailService;
    }
    async createAndSendWelcomeVerification(user) {
        const rawToken = await this.rotateVerificationToken(user.id);
        await this.authMailService.sendWelcomeVerification({
            userId: user.id,
            email: user.email,
            name: user.name,
            rawToken,
        });
    }
    async verifyEmail(dto) {
        const tokenHash = this.authMailService.hashToken(dto.token);
        const verification = await this.prisma.emailVerificationToken.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!verification || verification.usedAt) {
            throw new common_1.UnauthorizedException('Link de validação inválido ou expirado');
        }
        if (verification.expiresAt.getTime() < Date.now()) {
            throw new common_1.UnauthorizedException('Link de validação inválido ou expirado');
        }
        const user = await this.prisma.$transaction(async (tx) => {
            await tx.emailVerificationToken.update({
                where: { id: verification.id },
                data: { usedAt: new Date() },
            });
            return tx.user.update({
                where: { id: verification.userId },
                data: {
                    emailVerifiedAt: verification.user.emailVerifiedAt ?? new Date(),
                },
            });
        });
        return this.buildAuthResponse(user);
    }
    async resendVerification(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user || user.authProvider !== 'LOCAL' || user.emailVerifiedAt) {
            return {
                message: 'Se o e-mail estiver pendente de validação, enviaremos um novo link.',
            };
        }
        const latest = await this.prisma.emailVerificationToken.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        });
        if (latest &&
            Date.now() - latest.createdAt.getTime() < RESEND_COOLDOWN_MS) {
            throw new common_1.BadRequestException('Aguarde alguns minutos antes de solicitar um novo e-mail de validação.');
        }
        const rawToken = await this.rotateVerificationToken(user.id);
        await this.authMailService.sendVerificationResend({
            userId: user.id,
            email: user.email,
            name: user.name,
            rawToken,
        });
        return {
            message: 'Se o e-mail estiver pendente de validação, enviaremos um novo link.',
        };
    }
    async rotateVerificationToken(userId) {
        await this.prisma.emailVerificationToken.updateMany({
            where: {
                userId,
                usedAt: null,
            },
            data: {
                usedAt: new Date(),
            },
        });
        const rawToken = this.authMailService.createRawToken();
        const tokenHash = this.authMailService.hashToken(rawToken);
        const expiresAt = new Date(Date.now() + VERIFY_TOKEN_TTL_MS);
        await this.prisma.emailVerificationToken.create({
            data: {
                userId,
                tokenHash,
                expiresAt,
            },
        });
        return rawToken;
    }
    buildAuthResponse(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                phone: user.phone,
                avatarDataUrl: user.avatarDataUrl,
                role: user.role,
            },
        };
    }
};
exports.EmailVerificationService = EmailVerificationService;
exports.EmailVerificationService = EmailVerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        jwt_1.JwtService,
        auth_mail_service_js_1.AuthMailService])
], EmailVerificationService);
//# sourceMappingURL=email-verification.service.js.map