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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
const email_verification_service_js_1 = require("./email-verification.service.js");
const PASSWORD_SALT_ROUNDS = 10;
let AuthService = class AuthService {
    prisma;
    jwtService;
    emailVerificationService;
    constructor(prisma, jwtService, emailVerificationService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailVerificationService = emailVerificationService;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('E-mail já cadastrado');
        }
        const passwordHash = await (0, bcryptjs_1.hash)(dto.password, PASSWORD_SALT_ROUNDS);
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: passwordHash,
                authProvider: 'LOCAL',
                role: 'PARTICIPANT',
                emailVerifiedAt: null,
            },
        });
        await this.emailVerificationService.createAndSendWelcomeVerification(user);
        return {
            message: 'Conta criada. Enviamos um e-mail para validar seu endereço antes de entrar.',
            requiresEmailVerification: true,
            email: user.email,
        };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        if (!user.password) {
            throw new common_1.UnauthorizedException('Esta conta usa login social. Entre com Google ou Instagram.');
        }
        const passwordMatches = await (0, bcryptjs_1.compare)(dto.password, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        if (user.authProvider === 'LOCAL' && !user.emailVerifiedAt) {
            throw new common_1.ForbiddenException({
                code: 'EMAIL_NOT_VERIFIED',
                message: 'E-mail ainda não validado. Verifique sua caixa de entrada ou reenvie o link.',
            });
        }
        return this.buildAuthResponse(user);
    }
    async validateOAuthLogin(profile) {
        const existingOAuthUser = await this.prisma.user.findFirst({
            where: {
                authProvider: profile.provider,
                providerId: profile.providerId,
            },
        });
        if (existingOAuthUser) {
            if (!existingOAuthUser.emailVerifiedAt) {
                const verified = await this.prisma.user.update({
                    where: { id: existingOAuthUser.id },
                    data: { emailVerifiedAt: new Date() },
                });
                return this.toAuthUser(verified);
            }
            return this.toAuthUser(existingOAuthUser);
        }
        if (profile.email) {
            const existingEmailUser = await this.prisma.user.findUnique({
                where: { email: profile.email },
            });
            if (existingEmailUser) {
                const linkedUser = await this.prisma.user.update({
                    where: { id: existingEmailUser.id },
                    data: {
                        authProvider: profile.provider,
                        providerId: profile.providerId,
                        name: existingEmailUser.name || profile.name,
                        password: null,
                        emailVerifiedAt: existingEmailUser.emailVerifiedAt ?? new Date(),
                    },
                });
                return this.toAuthUser(linkedUser);
            }
        }
        const email = profile.email ??
            `${profile.provider.toLowerCase()}_${profile.providerId}@oauth.soccer.local`;
        const user = await this.prisma.user.create({
            data: {
                name: profile.name,
                email,
                authProvider: profile.provider,
                providerId: profile.providerId,
                password: null,
                emailVerifiedAt: new Date(),
            },
        });
        return this.toAuthUser(user);
    }
    async validateUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        return this.toAuthUser(user);
    }
    buildAuthResponseFromUser(user) {
        return this.buildAuthResponse(user);
    }
    buildAuthResponse(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            user: this.toAuthUser(user),
        };
    }
    toAuthUser(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        jwt_1.JwtService,
        email_verification_service_js_1.EmailVerificationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map