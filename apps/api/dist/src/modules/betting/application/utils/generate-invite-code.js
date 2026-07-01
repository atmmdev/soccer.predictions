"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInviteCode = generateInviteCode;
const node_crypto_1 = require("node:crypto");
const INVITE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateInviteCode(length = 8) {
    const bytes = (0, node_crypto_1.randomBytes)(length);
    let code = '';
    for (let index = 0; index < length; index += 1) {
        code += INVITE_ALPHABET[bytes[index] % INVITE_ALPHABET.length];
    }
    return code;
}
//# sourceMappingURL=generate-invite-code.js.map