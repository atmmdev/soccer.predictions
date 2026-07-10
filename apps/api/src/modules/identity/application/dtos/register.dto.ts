import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

import {
  FULL_NAME_PATTERN,
  normalizeFullName,
} from '../utils/full-name.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+$/;

export class RegisterDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? normalizeFullName(value) : value,
  )
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  @Matches(FULL_NAME_PATTERN, {
    message: 'Informe nome e sobrenome',
  })
  name!: string;

  @Matches(EMAIL_PATTERN, { message: 'email must be an email' })
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password!: string;
}
