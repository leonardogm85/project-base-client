import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { MaskTypes } from 'src/app/common/mask/mask-types';
import { NotificationResult } from 'src/app/common/validations/notifications/notification-result';
import { ObjectValidation } from 'src/app/common/validations/helpers/object-validation';
import { StringValidation } from 'src/app/common/validations/helpers/string-validation';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  @Input() form: FormGroup;
  @Input() notificationResult: NotificationResult;

  @Output() protected save: EventEmitter<void> = new EventEmitter<void>();

  protected iconSave: IconDefinition = faSave;
  protected iconReturn: IconDefinition = faChevronLeft;

  protected get maskTelefone(): string {
    const value = this.form.get('phoneNumber').value;

    return ObjectValidation.isNullOrUndefined(value) ?
      StringValidation.empty :
      (StringValidation.onlyNumbers(value).length === 11 ? MaskTypes.mobileNumber : MaskTypes.phoneNumber);
  }

  protected showPassword(): boolean {
    return StringValidation.isNullOrWhiteSpace(this.form.get('id').value);
  }

  protected onSave(): void {
    this.notificationResult = undefined;

    if (this.form.valid) {
      this.save.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

}
