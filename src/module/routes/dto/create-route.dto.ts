import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
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
  @IsString()
  @MinLength(4)
  durationEstimated: string;

  @IsDateString()
  @IsNotEmpty()
  departureDate: string;

  @IsDateString()
  @IsNotEmpty()
  arriveDate: string;

  @IsUUID()
  userId: string;
}
