"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FULL_NAME_PATTERN = void 0;
exports.normalizeFullName = normalizeFullName;
exports.isFullName = isFullName;
const NAME_PART_PATTERN = /^[\p{L}]+(?:['-][\p{L}]+)*$/u;
function normalizeFullName(value) {
    return value.trim().replace(/\s+/g, ' ');
}
function isFullName(value) {
    const normalized = normalizeFullName(value);
    const parts = normalized.split(' ');
    return (parts.length >= 2 &&
        parts.every(part => part.length >= 2 && NAME_PART_PATTERN.test(part)));
}
exports.FULL_NAME_PATTERN = /^[\p{L}]{2,}(?:['-][\p{L}]+)*(?:\s+[\p{L}]{2,}(?:['-][\p{L}]+)*)+$/u;
//# sourceMappingURL=full-name.js.map