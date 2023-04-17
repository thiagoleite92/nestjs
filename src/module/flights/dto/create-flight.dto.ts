import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { FlightStatus } from '../../../enums/flightstatus.enum';

export class CreateFlightDto {
  @IsNotEmpty()
  @IsUUID()
  routeId: string;

  @IsNotEmpty()
  @IsUUID()
  pilotId: string;

  @IsOptional()
  flightStatus: FlightStatus;
}
