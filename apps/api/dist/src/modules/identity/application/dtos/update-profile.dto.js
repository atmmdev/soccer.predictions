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
exports.UpdateProfileDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const full_name_js_1 = require("../utils/full-name.js");
const AVATAR_DATA_URL_PATTERN = /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/;
const E164_PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;
function normalizePhone(value) {
    if (typeof value !== 'string') {
        return value;
    }
    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }
    const digits = trimmed.replace(/\D/g, '');
    return `+${trimmed.startsWith('+') || ![10, 11].includes(digits.length) ? '' : '55'}${digits}`;
}
class UpdateProfileDto {
    name;
    phone;
    avatarDataUrl;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        const input = value;
        return typeof input === 'string' ? (0, full_name_js_1.normalizeFullName)(input) : input;
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(120),
    (0, class_validator_1.Matches)(full_name_js_1.FULL_NAME_PATTERN, {
        message: 'Informe nome e sobrenome',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => normalizePhone(value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(16),
    (0, class_validator_1.Matches)(E164_PHONE_PATTERN, {
        message: 'Informe um telefone válido com DDD',
    }),
    __metadata("design:type", Object)
], UpdateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100_000, {
        message: 'A imagem do perfil excede o tamanho permitido',
    }),
    (0, class_validator_1.Matches)(AVATAR_DATA_URL_PATTERN, {
        message: 'Formato de imagem inválido',
    }),
    __metadata("design:type", Object)
], UpdateProfileDto.prototype, "avatarDataUrl", void 0);
//# sourceMappingURL=update-profile.dto.js.map