import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+$/;

export class LoginDto {
  @Matches(EMAIL_PATTERN, { message: 'email must be an email' })
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
