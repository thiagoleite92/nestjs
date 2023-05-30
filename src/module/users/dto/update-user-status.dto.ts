import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserStatus {
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
