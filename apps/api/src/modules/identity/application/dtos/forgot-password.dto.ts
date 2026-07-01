import { Matches } from 'class-validator';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+$/;

export class ForgotPasswordDto {
  @Matches(EMAIL_PATTERN, { message: 'Informe um e-mail válido' })
  email!: string;
}
