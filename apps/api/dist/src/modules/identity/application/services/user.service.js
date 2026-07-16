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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../../../../shared/prisma/prisma.service.js");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateProfile(userId, dto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                name: dto.name,
                ...(dto.phone !== undefined ? { phone: dto.phone } : {}),
                ...(dto.avatarDataUrl !== undefined
                    ? { avatarDataUrl: dto.avatarDataUrl }
                    : {}),
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                avatarDataUrl: true,
                role: true,
            },
        });
        return user;
    }
    async listPoolDelegateCandidates() {
        const users = await this.prisma.user.findMany({
            where: {
                role: { in: ['ADMIN', 'PARTICIPANT'] },
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatarDataUrl: true,
                role: true,
            },
            orderBy: { name: 'asc' },
        });
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map