import { IsString, MaxLength, MinLength } from 'class-validator';

export class JoinPoolDto {
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  inviteCode!: string;
}
