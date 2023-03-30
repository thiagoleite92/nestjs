import { BadRequestException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { states } from 'src/utils/states';

@ValidatorConstraint({ async: true })
export class ValidCity implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    const valueLowerCase = value.toLowerCase();

    return !!states.find(
      (state) =>
        state.Nome.toLowerCase() === valueLowerCase ||
        state.Sigla.toLowerCase() === valueLowerCase,
    );
  }
}
