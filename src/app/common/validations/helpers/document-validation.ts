import { CpfValidation } from './cpf-validation';
import { CnpjValidation } from './cnpj-validation';
import { StringValidation } from './string-validation';

export class DocumentValidation {

  static valid(value: string): boolean {
    return CpfValidation.valid(value) || CnpjValidation.valid(value);
  }

  static removeMask(value: string): string {
    if (StringValidation.isNullOrWhiteSpace(value)) {
      return StringValidation.empty;
    }

    const result: string = CpfValidation.removeMask(value);

    return StringValidation.isNullOrWhiteSpace(result) ?
      CnpjValidation.removeMask(value) :
      result;
  }

  static addMask(value: string): string {
    const withoutMask = DocumentValidation.removeMask(value);

    if (StringValidation.isNullOrWhiteSpace(withoutMask)) {
      return StringValidation.empty;
    }

    const result = CpfValidation.addMask(value);

    return StringValidation.isNullOrWhiteSpace(result) ?
      CnpjValidation.addMask(value) :
      result;
  }

}
