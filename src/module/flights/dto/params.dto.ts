import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QuerypParamsDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  skip: number;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  take: number;
}
