import { ValidatorConstraintInterface } from 'class-validator';
export declare class ValidCity implements ValidatorConstraintInterface {
    validate(value: any): boolean | Promise<boolean>;
}
