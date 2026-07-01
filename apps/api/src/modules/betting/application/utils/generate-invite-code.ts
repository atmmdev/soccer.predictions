import { randomBytes } from 'node:crypto';

const INVITE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateInviteCode(length = 8): string {
  const bytes = randomBytes(length);
  let code = '';

  for (let index = 0; index < length; index += 1) {
    code += INVITE_ALPHABET[bytes[index]! % INVITE_ALPHABET.length];
  }

  return code;
}
