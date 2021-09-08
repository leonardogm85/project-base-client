import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { ObjectValidation } from '../helpers/object-validation';

export class ObjectContract {

  static isNullOrUndefined(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return ObjectValidation.isNullOrUndefined(control.value) ?
        null :
        { 'ObjectContract-isNullOrUndefined': message };
    };
  }

  static isntNullOrUndefined(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return ObjectValidation.isntNullOrUndefined(control.value) ?
        null :
        { 'ObjectContract-isntNullOrUndefined': message };
    };
  }

}
