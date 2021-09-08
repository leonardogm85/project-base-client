import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export class NumberContract {

  static isBetween(from: number, to: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return control.value >= from && control.value <= to ?
        null :
        { 'NumberContract-isBetween': message };
    };
  }

  static isGreaterThan(comparer: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return control.value > comparer ?
        null :
        { 'NumberContract-isGreaterThan': message };
    };
  }

  static isGreaterOrEqualsThan(comparer: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return control.value >= comparer ?
        null :
        { 'NumberContract-isGreaterOrEqualsThan': message };
    };
  }

  static isLowerThan(comparer: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return control.value < comparer ?
        null :
        { 'NumberContract-isLowerThan': message };
    };
  }

  static isLowerOrEqualsThan(comparer: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return control.value <= comparer ?
        null :
        { 'NumberContract-isLowerOrEqualsThan': message };
    };
  }

}
