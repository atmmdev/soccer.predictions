import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { FULL_NAME_PATTERN, normalizeFullName } from '../utils/full-name.js';

const AVATAR_DATA_URL_PATTERN =
  /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/;
const E164_PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;

function normalizePhone(value: unknown): unknown {
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

export class UpdateProfileDto {
  @Transform(({ value }) => {
    const input: unknown = value;
    return typeof input === 'string' ? normalizeFullName(input) : input;
  })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  @Matches(FULL_NAME_PATTERN, {
    message: 'Informe nome e sobrenome',
  })
  name!: string;

  @Transform(({ value }) => normalizePhone(value))
  @IsOptional()
  @IsString()
  @MaxLength(16)
  @Matches(E164_PHONE_PATTERN, {
    message: 'Informe um telefone válido com DDD',
  })
  phone?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100_000, {
    message: 'A imagem do perfil excede o tamanho permitido',
  })
  @Matches(AVATAR_DATA_URL_PATTERN, {
    message: 'Formato de imagem inválido',
  })
  avatarDataUrl?: string | null;
}
