import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MinLength,
} from 'class-validator';
import hoursToSeconds from '../../../utils/time-adjust';

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
  @Transform(({ value }) => hoursToSeconds(value))
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
