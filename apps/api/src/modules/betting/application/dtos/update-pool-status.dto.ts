import { IsIn } from 'class-validator';

export class UpdatePoolStatusDto {
  @IsIn(['ACTIVE', 'INACTIVE', 'CLOSED'])
  status!: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
}
