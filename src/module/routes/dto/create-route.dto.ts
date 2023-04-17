import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Length,
  Validate,
} from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @Length(3, 255)
  origin: string;

  @IsNotEmpty()
  @Length(3, 255)
  destiny: string;

  @IsNotEmpty()
  durationEstimated: number;

  @IsDateString()
  departureTime;

  @IsUUID()
  userId: string;

  @IsDateString()
  @IsOptional()
  arrivalTime;
}
