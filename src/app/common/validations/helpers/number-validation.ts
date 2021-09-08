import { StringValidation } from './string-validation';

export class NumberValidation {

  static readonly pattern: RegExp = /^(\d{1,3})(\.\d{3})*(\,\d+)?$/;

  static valid(value: string): boolean {
    return StringValidation.isntNullOrWhiteSpace(value) && NumberValidation.pattern.test(value);
  }

}
