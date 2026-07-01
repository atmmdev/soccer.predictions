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
exports.PoolOwnerGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let PoolOwnerGuard = class PoolOwnerGuard {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const rawId = request.params.id ?? request.params.poolId;
        const poolId = Number(rawId);
        if (!Number.isInteger(poolId) || poolId <= 0) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        if (user.role === 'SUPER_ADMIN') {
            return true;
        }
        const pool = await this.prisma.pool.findUnique({
            where: { id: poolId },
            select: { ownerId: true },
        });
        if (!pool) {
            throw new common_1.NotFoundException('Bolão não encontrado');
        }
        if (pool.ownerId !== user.id) {
            throw new common_1.ForbiddenException('Somente o proprietário pode executar esta ação');
        }
        return true;
    }
};
exports.PoolOwnerGuard = PoolOwnerGuard;
exports.PoolOwnerGuard = PoolOwnerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], PoolOwnerGuard);
//# sourceMappingURL=pool-owner.guard.js.map