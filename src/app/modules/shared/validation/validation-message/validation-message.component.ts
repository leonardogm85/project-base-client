import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ObjectValidation } from 'src/app/common/validations/helpers/object-validation';
import { StringValidation } from 'src/app/common/validations/helpers/string-validation';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent {

  @Input() control: AbstractControl;

  get message(): string {
    if (ObjectValidation.isntNullOrUndefined(this.control) && this.control.invalid && this.control.touched) {
      const keys = Object.keys(this.control.errors);

      if (keys.length > 0) {
        return this.control.errors[keys[0]];
      }
    }

    return StringValidation.empty;
  }

}
