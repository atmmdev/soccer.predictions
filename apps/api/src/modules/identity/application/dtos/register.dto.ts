import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+$/;

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @Matches(EMAIL_PATTERN, { message: 'email must be an email' })
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password!: string;
}
