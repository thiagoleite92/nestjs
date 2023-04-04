import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { FlightStatus } from 'src/enums/flightStatus.enum';

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
