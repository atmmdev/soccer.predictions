import { IsEmail } from 'class-validator';

export class ResendVerificationDto {
  @IsEmail({}, { message: 'Informe um e-mail válido' })
  email!: string;
}
