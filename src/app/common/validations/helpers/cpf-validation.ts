import { StringValidation } from './string-validation';

export class CpfValidation {

  static readonly pattern: RegExp = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

  static valid(value: string): boolean {
    if (StringValidation.isNullOrWhiteSpace(value) || !this.pattern.test(value)) {
      return false;
    }

    const withoutMask = CpfValidation.removeMask(value);

    const invalid = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999'
    ];

    if (invalid.some(i => i === withoutMask)) {
      return false;
    }

    let add = 0;

    for (let i = 0; i < 9; i++) {
      add += parseInt(withoutMask[i]) * (10 - i);
    }

    let rev = 11 - (add % 11);

    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    if (rev !== parseInt(withoutMask[9])) {
      return false;
    }

    add = 0;

    for (let i = 0; i < 10; i++) {
      add += parseInt(withoutMask[i]) * (11 - i);
    }

    rev = 11 - (add % 11);

    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    if (rev !== parseInt(withoutMask[10])) {
      return false;
    }

    return true;
  }

  static removeMask(value: string): string {
    if (StringValidation.isNullOrWhiteSpace(value)) {
      return StringValidation.empty;
    }

    const onlyNumbers = StringValidation.onlyNumbers(value);

    return onlyNumbers.length === 11 ?
      onlyNumbers :
      StringValidation.empty;
  }

  static addMask(value: string): string {
    const withoutMask = CpfValidation.removeMask(value);

    return StringValidation.isNullOrWhiteSpace(withoutMask) ?
      StringValidation.empty :
      withoutMask.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

}
