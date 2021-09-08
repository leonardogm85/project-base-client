import { StringValidation } from './string-validation';

export class EmailValidation {

  static readonly pattern: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  static valid(value: string): boolean {
    return StringValidation.isntNullOrWhiteSpace(value) && EmailValidation.pattern.test(value);
  }

}
