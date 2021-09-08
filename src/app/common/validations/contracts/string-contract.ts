import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { Subscription } from 'rxjs';

import { StringValidation } from '../helpers/string-validation';
import { EmailValidation } from '../helpers/email-validation';
import { PhoneValidation } from '../helpers/phone-validation';
import { ZipCodeValidation } from '../helpers/zip-code-validation';
import { CpfValidation } from '../helpers/cpf-validation';
import { CnpjValidation } from '../helpers/cnpj-validation';
import { DocumentValidation } from '../helpers/document-validation';
import { ObjectValidation } from '../helpers/object-validation';

export class StringContract {

  static isNullOrEmpty(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrEmpty(control.value) ?
        null :
        { 'StringContract-isNullOrEmpty': message };
    };
  }

  static isntNullOrEmpty(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isntNullOrEmpty(control.value) ?
        null :
        { 'StringContract-isntNullOrEmpty': message };
    };
  }

  static isNullOrWhiteSpace(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) ?
        null :
        { 'StringContract-isNullOrWhiteSpace': message };
    };
  }

  static isntNullOrWhiteSpace(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isntNullOrWhiteSpace(control.value) ?
        null :
        { 'StringContract-isntNullOrWhiteSpace': message };
    };
  }

  static hasMinLength(length: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || control.value.length >= length ?
        null :
        { 'StringContract-hasMinLength': message };
    };
  }

  static hasMaxLength(length: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || control.value.length <= length ?
        null :
        { 'StringContract-hasMaxLength': message };
    };
  }

  static hasLength(length: number, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || control.value.length === length ?
        null :
        { 'StringContract-hasLength': message };
    };
  }

  static isEmail(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || EmailValidation.valid(control.value) ?
        null :
        { 'StringContract-isEmail': message };
    };
  }

  static isPhone(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || PhoneValidation.valid(control.value) ?
        null :
        { 'StringContract-isPhone': message };
    };
  }

  static isZipCode(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || ZipCodeValidation.valid(control.value) ?
        null :
        { 'StringContract-isZipCode': message };
    };
  }

  static isCpf(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || CpfValidation.valid(control.value) ?
        null :
        { 'StringContract-isCpf': message };
    };
  }

  static isCnpj(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || CnpjValidation.valid(control.value) ?
        null :
        { 'StringContract-isCnpj': message };
    };
  }

  static isDocument(message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return StringValidation.isNullOrWhiteSpace(control.value) || DocumentValidation.valid(control.value) ?
        null :
        { 'StringContract-isDocument': message };
    };
  }

  static areEquals(comparerName: string, message: string): ValidatorFn {
    let subscription: Subscription;

    return (control: AbstractControl): ValidationErrors => {
      const comparerControl = control.root.get(comparerName);

      if (ObjectValidation.isntNullOrUndefined(comparerControl)) {
        if (ObjectValidation.isNullOrUndefined(subscription)) {
          subscription = comparerControl.valueChanges.subscribe(() => control.updateValueAndValidity());
        }

        const valueControl = control.value;
        const valueComparer = comparerControl.value;

        return (StringValidation.isNullOrEmpty(valueControl) && StringValidation.isNullOrEmpty(valueComparer)) || valueControl === valueComparer ?
          null :
          { 'StringContract-areEquals': message };
      }

      return null;
    };
  }

  static arentEquals(comparerName: string, message: string): ValidatorFn {
    let subscription: Subscription;

    return (control: AbstractControl): ValidationErrors => {
      const comparerControl = control.root.get(comparerName);

      if (ObjectValidation.isntNullOrUndefined(comparerControl)) {
        if (ObjectValidation.isNullOrUndefined(subscription)) {
          subscription = comparerControl.valueChanges.subscribe(() => control.updateValueAndValidity());
        }

        const valueControl = control.value;
        const valueComparer = comparerControl.value;

        return (StringValidation.isNullOrEmpty(valueControl) && StringValidation.isNullOrEmpty(valueComparer)) || valueControl !== valueComparer ?
          null :
          { 'StringContract-arentEquals': message };
      }

      return null;
    };
  }

  static conditionalIsNullOrEmpty(comparerName: string, validators: ((control: AbstractControl) => ValidationErrors)[]): ValidatorFn {
    let subscription: Subscription;

    return (control: AbstractControl): ValidationErrors => {
      const comparerControl = control.root.get(comparerName);

      if (ObjectValidation.isntNullOrUndefined(comparerControl)) {
        if (ObjectValidation.isNullOrUndefined(subscription)) {
          subscription = comparerControl.valueChanges.subscribe(() => control.updateValueAndValidity());
        }

        if (StringValidation.isNullOrEmpty(comparerControl.value)) {
          for (const validator of validators) {
            const value = validator(control);
            if (ObjectValidation.isntNullOrUndefined(value)) {
              return value;
            }
          }
        }
      }

      return null;
    };
  }

  static conditionalIsntNullOrEmpty(comparerName: string, validators: ((control: AbstractControl) => ValidationErrors)[]): ValidatorFn {
    let subscription: Subscription;

    return (control: AbstractControl): ValidationErrors => {
      const comparerControl = control.root.get(comparerName);

      if (ObjectValidation.isntNullOrUndefined(comparerControl)) {
        if (ObjectValidation.isNullOrUndefined(subscription)) {
          subscription = comparerControl.valueChanges.subscribe(() => control.updateValueAndValidity());
        }

        if (StringValidation.isntNullOrEmpty(comparerControl.value)) {
          for (const validator of validators) {
            const value = validator(control);
            if (ObjectValidation.isntNullOrUndefined(value)) {
              return value;
            }
          }
        }
      }

      return null;
    };
  }

}
