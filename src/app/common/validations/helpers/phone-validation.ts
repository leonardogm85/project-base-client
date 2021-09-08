import { StringValidation } from './string-validation';

export class PhoneValidation {

  static readonly pattern: RegExp = /^\([\d]{2}\)\s[\d]{4,5}\-[\d]{4}$/;

  static valid(value: string): boolean {
    return StringValidation.isntNullOrWhiteSpace(value) && PhoneValidation.pattern.test(value);
  }

  static removeMask(value: string): string {
    if (StringValidation.isNullOrWhiteSpace(value)) {
      return StringValidation.empty;
    }

    const onlyNumbers = StringValidation.onlyNumbers(value);

    return onlyNumbers.length === 10 || onlyNumbers.length === 11 ?
      onlyNumbers :
      StringValidation.empty;
  }

  static addMask(value: string): string {
    const withoutMask = PhoneValidation.removeMask(value);

    return StringValidation.isNullOrWhiteSpace(withoutMask) ?
      StringValidation.empty :
      withoutMask.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }

}
