import { StringValidation } from './string-validation';

export class ZipCodeValidation {

  static readonly pattern: RegExp = /^[\d]{2}\.[\d]{3}\-[\d]{3}$/;

  static valid(value: string): boolean {
    return StringValidation.isntNullOrWhiteSpace(value) && ZipCodeValidation.pattern.test(value);
  }

  static removeMask(value: string): string {
    if (StringValidation.isNullOrWhiteSpace(value)) {
      return StringValidation.empty;
    }

    const onlyNumbers = StringValidation.onlyNumbers(value);

    return onlyNumbers.length === 8 ?
      onlyNumbers :
      StringValidation.empty;
  }

  static addMask(value: string): string {
    const withoutMask = ZipCodeValidation.removeMask(value);

    return StringValidation.isNullOrWhiteSpace(withoutMask) ?
      StringValidation.empty :
      withoutMask.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
  }

}
