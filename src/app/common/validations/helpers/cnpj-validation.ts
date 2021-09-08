import { StringValidation } from './string-validation';

export class CnpjValidation {

  static readonly pattern: RegExp = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

  static valid(value: string): boolean {
    if (StringValidation.isNullOrWhiteSpace(value) || !this.pattern.test(value)) {
      return false;
    }

    const withoutMask = CnpjValidation.removeMask(value);

    const invalid = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999'
    ];

    if (invalid.some(i => i === withoutMask)) {
      return false;
    }

    let length = withoutMask.length - 2;
    let numbers = withoutMask.substring(0, length);
    let add = 0;
    let position = length - 7;

    const digits = withoutMask.substring(length);

    for (let i = length; i >= 1; i--) {
      add += parseInt(numbers[length - i]) * position--;

      if (position < 2) {
        position = 9;
      }
    }

    let rev = ((add % 11) < 2) ?
      0 :
      (11 - (add % 11));

    if (rev !== parseInt(digits[0])) {
      return false;
    }

    length++;
    numbers = withoutMask.substring(0, length);
    add = 0;
    position = length - 7;

    for (let i = length; i >= 1; i--) {
      add += parseInt(numbers[length - i]) * position--;

      if (position < 2) {
        position = 9;
      }
    }

    rev = ((add % 11) < 2) ?
      0 :
      (11 - (add % 11));

    if (rev !== parseInt(digits[1])) {
      return false;
    }

    return true;
  }

  static removeMask(value: string): string {
    if (StringValidation.isNullOrWhiteSpace(value)) {
      return StringValidation.empty;
    }

    const onlyNumbers = StringValidation.onlyNumbers(value);

    return onlyNumbers.length === 14 ?
      onlyNumbers :
      StringValidation.empty;
  }

  static addMask(value: string): string {
    const withoutMask = CnpjValidation.removeMask(value);

    return StringValidation.isNullOrWhiteSpace(withoutMask) ?
      StringValidation.empty :
      withoutMask.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

}
