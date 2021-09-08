import { ObjectValidation } from './object-validation';

export class StringValidation {

  static readonly empty = '';

  static isNullOrEmpty(value: string): boolean {
    return ObjectValidation.isNullOrUndefined(value) || value === StringValidation.empty;
  }

  static isntNullOrEmpty(value: string): boolean {
    return !StringValidation.isNullOrEmpty(value);
  }

  static isNullOrWhiteSpace(value: string): boolean {
    return ObjectValidation.isNullOrUndefined(value) || value.trim() === StringValidation.empty;
  }

  static isntNullOrWhiteSpace(value: string): boolean {
    return !StringValidation.isNullOrWhiteSpace(value);
  }

  static onlyNumbers(value: string): string {
    return value.replace(/[^0-9]+/g, StringValidation.empty);
  }

  static onlyLetters(value: string): string {
    return value.replace(/[^a-z]+/ig, StringValidation.empty);
  }

}
